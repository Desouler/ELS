#!/bin/bash
set -e

## list of apps
APP_LIST=( elastic kibana logstash my_app filebeat )

cd /certs
rm -f ca.*

for app in "${APP_LIST[@]}"
do
  echo deleting $app
  rm -fR ./$app
done


OPENSSL_INSTALLED=false

if which openssl >/dev/null
then
  OPENSSL_INSTALLED=true
fi

## certificate parameters
COUNTRY_NAME="GR"
STATE_NAME="Macedonia"
LOCALITY_NAME="Sindos"
ORGANIZATION_NAME="ACME Co, LLC."
ORGANIZATIONAL_UNIT_NAME="ACME Department"
EMAIL_ADDRESS="fotisn@gmail.com"

OPENSSL_SUBJ_OPTIONS="
Country Name (2 letter code) [AU]:$COUNTRY_NAME
State or Province Name (full name) [Some-State]:$STATE_NAME
Locality Name (eg, city) []:$LOCALITY_NAME
Organization Name (eg, company) [Internet Widgits Pty Ltd]:$ORGANIZATION_NAME
Organizational Unit Name (eg, section) []:$ORGANIZATIONAL_UNIT_NAME
Email Address []:$EMAIL_ADDRESS
"

if [ "$OPENSSL_INSTALLED" = true ]
then
  echo "generating self signed certificate"
  echo "with these options: "
  echo "$OPENSSL_SUBJ_OPTIONS"
  echo ""

  echo "Generating CA key and certificate"
  openssl genpkey \
    -algorithm RSA \
    -pkeyopt rsa_keygen_bits:4096 \
    -out ca.key

  openssl req \
    -new \
    -newkey rsa:4096 \
    -days 365 \
    -nodes \
    -x509 \
    -subj "/emailAddress=$EMAIL_ADDRESS/C=$COUNTRY_NAME/ST=$STATE_NAME/L=$LOCALITY_NAME/O=$ORGANIZATION_NAME/OU=$ORGANIZATIONAL_UNIT_NAME/CN=localhost" \
    -keyout ca.key \
    -out ca.crt

  for app in "${APP_LIST[@]}"
  do
    ## generate self signed certificate,key for each app

    if [[ "$app" == "elastic" ]]
    then
      COMMON_NAME="elasticsearch"
    elif [[ "$app" == "my_app" ]]
    then
      COMMON_NAME="localhost"
    else
      COMMON_NAME="$app"
    fi

    echo "Generating certs for ${COMMON_NAME} application"

    openssl genpkey \
      -algorithm RSA \
      -pkeyopt rsa_keygen_bits:4096 \
      -out $app.key

    openssl req \
      -new \
      -key $app.key \
      -subj "/emailAddress=$EMAIL_ADDRESS/C=$COUNTRY_NAME/ST=$STATE_NAME/L=$LOCALITY_NAME/O=$ORGANIZATION_NAME/OU=$ORGANIZATIONAL_UNIT_NAME/CN=$COMMON_NAME" \
      -out $app.csr

    openssl x509 \
      -req \
      -in $app.csr \
      -CA ca.crt \
      -CAkey ca.key \
      -days 500 \
      -sha256 \
      -CAcreateserial \
      -out $app.crt

    mkdir $app
    cp ca.crt ./$app/ca.crt
    mv $app.csr $app.crt $app.key ./$app

  done

else
  echo "openssl is not installed"
  exit 1
fi

#end

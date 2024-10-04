export interface IToken {
  aud?: string;
  exp?: number;
  iat?: number;
  iss?: string;
  jti?: string;
  nbf?: number;
  sub?: string;
  role?: string[];
  fhirId?: string;
  userId: number;
  fullname?: string;
  profileId?: number;
}

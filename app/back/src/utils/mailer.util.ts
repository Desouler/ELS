import * as fs from "fs";
import { logger } from "./logger.util";
import {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USE_TLS,
  SMTP_USER_NAME,
  SMTP_USER_PASSWORD,
  FRONT_URL,
  SITE_URL,
  BASE_ASSET_FOLDER,
  ADDRESS,
  PHONE,
  EMAIL,
} from "./config.util";
import * as nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export function sendEmail(
  templatePath: string,
  subject: string,
  to: string,
  from: string,
  context: any,
  locale: string,
  templateString?: string,
  attachment?: string
) {
  return new Promise((resolve, reject) => {
    try {
      let contentMarkup = templateString ? templateString : fs.readFileSync(templatePath, "utf8");
      let message: any = {};
      if (templatePath) {
        for (const prop in context) {
          if (!context.hasOwnProperty(prop)) continue;

          contentMarkup = contentMarkup.replace(new RegExp(`{{${prop}}}`, "g"), context[prop]);
        }

        let headerMarkup = fs.readFileSync(
          __dirname + `/../../email_templates/email-header.${locale}.tpl.html`,
          "utf8"
        );
        let footerMarkup = fs.readFileSync(
          __dirname + `/../../email_templates/email-footer.${locale}.tpl.html`,
          "utf8"
        );

        headerMarkup = headerMarkup.replace(new RegExp(`{topMessage}`, "g"), context.topMessage);
        footerMarkup = footerMarkup.replace(new RegExp(`{fronturl}`, "g"), FRONT_URL);

        message = {
          from,
          to,
          subject,
          html: headerMarkup + contentMarkup + footerMarkup,
        };
      } else {
        const data: any = {
          backurl: SITE_URL,
          publicHolder: BASE_ASSET_FOLDER,
          innerHtml: contentMarkup,
          address: ADDRESS,
          phone: PHONE,
          email: EMAIL,
          topMessage: context.topMessage,
        };

        let headerTempalte = fs
          .readFileSync(__dirname + "/../../email_templates/email-header.gr.tpl.html")
          .toString("utf8");
        let footerTempalte = fs
          .readFileSync(__dirname + "/../../email_templates/email-footer.gr.tpl.html")
          .toString("utf8");

        for (const prop in data) {
          if (data.hasOwnProperty(prop)) {
            headerTempalte = headerTempalte.replace(new RegExp(`{${prop}}`, "g"), data[prop]);
            footerTempalte = footerTempalte.replace(new RegExp(`{${prop}}`, "g"), data[prop]);
          }
        }

        message = {
          from: EMAIL,
          to,
          subject,
          html: headerTempalte + footerTempalte,
        };

        if (attachment)
          message.attachments = [
            {
              filename: `speedex.pdf`,
              content: attachment,
              encoding: "base64",
            },
          ];
      }

      const options: SMTPTransport.Options = {
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_USE_TLS, // true for 465, false for other ports (e.g. 25, 587)
        auth: {
          user: SMTP_USER_NAME,
          pass: SMTP_USER_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      };
      const transporter = nodemailer.createTransport(options);

      transporter.sendMail(message, (error, info) => {
        if (error) {
          logger.error(error);
          reject(error);
        } else {
          logger.info("Message sent: " + info.messageId);
          resolve(info);
        }
      });
    } catch (e) {
      logger.error(e);
      reject(e);
    }
  });
}

export function sendEmailNoFooter(
  templatePath: string,
  subject: string,
  to: string,
  from: string,
  context: any,
  locale: string,
  templateString?: string,
  attachment?: string
) {
  return new Promise((resolve, reject) => {
    try {
      let contentMarkup = templateString ? templateString : fs.readFileSync(templatePath, "utf8");
      let message: any = {};
      if (templatePath) {
        for (const prop in context) {
          if (!context.hasOwnProperty(prop)) continue;

          contentMarkup = contentMarkup.replace(new RegExp(`{{${prop}}}`, "g"), context[prop]);
        }

        let headerMarkup = fs.readFileSync(
          __dirname + `/../../email_templates/email-header.${locale}.tpl.html`,
          "utf8"
        );

        headerMarkup = headerMarkup.replace(new RegExp(`{topMessage}`, "g"), context.topMessage);

        message = {
          from,
          to,
          subject,
          html: headerMarkup + contentMarkup,
        };
      } else {
        const data: any = {
          backurl: SITE_URL,
          publicHolder: BASE_ASSET_FOLDER,
          innerHtml: contentMarkup,
          address: ADDRESS,
          phone: PHONE,
          email: EMAIL,
          topMessage: context.topMessage,
        };

        let headerTempalte = fs
          .readFileSync(__dirname + "/../../email_templates/email-header.gr.tpl.html")
          .toString("utf8");

        for (const prop in data) {
          if (data.hasOwnProperty(prop)) {
            headerTempalte = headerTempalte.replace(new RegExp(`{${prop}}`, "g"), data[prop]);
          }
        }

        message = {
          from: EMAIL,
          to,
          subject,
          html: headerTempalte,
        };

        if (attachment)
          message.attachments = [
            {
              filename: `speedex.pdf`,
              content: attachment,
              encoding: "base64",
            },
          ];
      }

      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_USE_TLS, // true for 465, false for other ports (e.g. 25, 587)
        auth: {
          user: SMTP_USER_NAME,
          pass: SMTP_USER_PASSWORD,
        },
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false,
        },
      });

      transporter.sendMail(message, (error, info) => {
        if (error) {
          logger.error(error);
          reject(error);
        } else {
          logger.info("Message sent: " + info.messageId);
          resolve(info);
        }
      });
    } catch (e) {
      logger.error(e);
      reject(e);
    }
  });
}


export function sendEmailFromTemplate(
  template: string,
  subject: string,
  to: string,
  from: string,
  context: any,
  locale: string,
  useHeaderFooter: boolean,
  callback: any,
  errorCallback: any
) {
  try {
    for (const prop in context) {
      if (!context.hasOwnProperty(prop)) continue;
      template = template.replace(new RegExp(`{${prop}}`, "g"), context[prop]);
    }

    const headerMarkup = fs.readFileSync(__dirname + `/../../email_templates/email-header.${locale}.tpl.html`, "utf8");
    let footerMarkup = fs.readFileSync(__dirname + `/../../email_templates/email-footer.${locale}.tpl.html`, "utf8");

    footerMarkup = footerMarkup.replace(new RegExp(`{fronturl}`, "g"), FRONT_URL);

    let html = template;
    if (useHeaderFooter) {
      html = headerMarkup + template + footerMarkup;
    }
    const message = {
      from,
      to,
      subject,
      html,
    };

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_USE_TLS, // true for 465, false for other ports (e.g. 25, 587)
      auth: {
        user: SMTP_USER_NAME,
        pass: SMTP_USER_PASSWORD,
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });

    transporter.sendMail(message, (error, info) => {
      if (error) {
        logger.error(error);
        errorCallback();
        // reject(error);
      } else {
        logger.info("Message sent: " + info.messageId);
        callback();
        return info;
      }
    });
  } catch (e) {
    logger.error(e);
    errorCallback();
    // reject(e);
  }
  // });
}

export function sendSimpleEmail(template: string, subject: string, to: string, from: string) {
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_USE_TLS, // true for 465, false for other ports (e.g. 25, 587)
    auth: {
      user: SMTP_USER_NAME,
      pass: SMTP_USER_PASSWORD,
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  const message: Mail.Options = {
    from,
    to,
    subject,
    html: template,
  };

  transporter.sendMail(message, (error, info) => {
    if (error) {
      logger.error(error);
    } else {
      logger.info("Message sent: " + info.messageId);
      return info;
    }
  });
}

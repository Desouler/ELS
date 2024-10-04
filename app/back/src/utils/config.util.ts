import * as dotenv from "dotenv";
import * as fs from "fs";

if (fs.existsSync(".env")) {
    dotenv.config({ path: ".env" });
}

export const BASE_ASSET_FOLDER = String(process.env.BASE_ASSET_FOLDER);
export const EMAIL = String(process.env.EMAIL);
export const SITE_URL = String(process.env.SITE_URL);


export const SMTP_HOST = String(process.env.SMTP_HOST);
export const SMTP_PORT = Number(process.env.SMTP_PORT);
export const SMTP_USE_TLS = Number(process.env.SMTP_USE_TLS) === 0 ? false : true;
export const SMTP_USER_NAME = String(process.env.SMTP_USER_NAME);
export const SMTP_USER_PASSWORD = String(process.env.SMTP_USER_PASSWORD);
export const FRONT_URL = String(process.env.FRONT_URL);
export const ADDRESS = String(process.env.ADDRESS);
export const PHONE = String(process.env.PHONE);

export const TOKEN_EXPIRES_IN_ACCESS = Number(process.env.TOKEN_EXPIRES_IN_ACCESS);
export const TOKEN_EXPIRES_IN_REFRESH = Number(process.env.TOKEN_EXPIRES_IN_REFRESH);

export const SEND_EMAILS = Number(process.env.SEND_EMAILS) === 1 ? true : false;

export const NODE_ENV = String(process.env.NODE_ENV);

export const SERVER_PORT = Number(process.env.SERVER_PORT);

export const enum RoleTypes {
    RoleSuperAdmin = "ROLE_SUPER_ADMIN",
    RoleAdmin = "ROLE_ADMIN"
};
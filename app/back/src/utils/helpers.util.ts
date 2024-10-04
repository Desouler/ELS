import * as fs from "fs";
import { IToken } from "../types/token.type";
import * as jwt from "jsonwebtoken";
import { logger } from "./logger.util";
import moment from "moment";
import { stripHtml } from "string-strip-html";

class Helpers {
  public deserializeQueryString(str: string) {
    const variables = str.split("&");
    const ob: any = {};

    variables.forEach((x) => {
      ob[x.split("=")[0]] = x.split("=")[1];
    });

    return ob;
  }

  public validateToken(token: string) {
    const cert_pub = fs.readFileSync("./cert/rsa-public-key.pem");
    const options: jwt.VerifyOptions = {
      algorithms: ["RS256"],
    };

    const decoded: IToken = jwt.verify(token, cert_pub, options) as IToken;

    return decoded;
  }

  public randomString(length: number = 10) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  public randomNumber(length: number = 10) {
    let result = "";
    const characters = "123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return Number(result);
  }

  public arraysAreEqual(a: any[], b: any[]) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    const arrA = a.slice().sort();
    const arrB = b.slice().sort();

    for (let i = 0; i < arrA.length; ++i) {
      if (arrA[i] !== arrB[i]) return false;
    }
    return true;
  }

  public getNonHtmlSubString(text: string, numberOfChars: number, applyDots: boolean = false) {
    const nonHtml = stripHtml(text).result;

    let sub = nonHtml.substring(0, nonHtml.length < numberOfChars ? nonHtml.length : numberOfChars);

    if (nonHtml.length >= numberOfChars) {
      sub += "..";
    }

    return sub;
  }

  public getUniqueStrings(value: any, index: any, self: any) {
    return self.indexOf(value) === index;
  }

  public treeify(list: any[], idAttr: any, parentAttr: any, childrenAttr: any) {
    if (!idAttr) idAttr = "id";
    if (!parentAttr) parentAttr = "parent";
    if (!childrenAttr) childrenAttr = "children";

    const treeList: any[] = [];
    const lookup: any = {};
    list.forEach((obj) => {
      lookup[obj[idAttr]] = obj;
      obj[childrenAttr] = [];
    });
    list.forEach((obj) => {
      if (obj[parentAttr] != null) {
        lookup[obj[parentAttr]][childrenAttr].push(obj);
      } else {
        treeList.push(obj);
      }
    });
    return treeList;
  }

  public isImageFile(filename: string) {
    try {
      const extension = filename.split(".")[filename.split(".").length - 1].toLowerCase();
      if (
        extension === "png" ||
        extension === "jpg" ||
        extension === "jpeg" ||
        extension === "jpeg" ||
        extension === "tiff" ||
        extension === "gif" ||
        extension === "bmp" ||
        extension === "webp"
      ) {
        return true;
      }
    } catch (err) {
      logger.error("error on isImageFile function. filenname to check: " + filename);
    }
    return false;
  }

  public isPdfFile(filename: string) {
    try {
      const extension = filename.split(".")[filename.split(".").length - 1].toLowerCase();
      if (extension === "pdf" || extension === "PDF") {
        return true;
      }
    } catch (err) {
      logger.error("error on isImageFile function. filenname to check: " + filename);
    }
    return false;
  }
}

export const helpers = new Helpers();

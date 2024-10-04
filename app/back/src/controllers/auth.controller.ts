import { NextFunction, Request, Response } from "express";
import { ApiController } from "./api.controller";
import responseUtil from "../utils/response.util";
import axios from "axios";
import * as https from 'https';

class AuthController extends ApiController {
  async token(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const apiKey = body.apiKey;
      const url = body.url;
      const agent = new https.Agent({rejectUnauthorized: false})

      const result = await axios.post(`${url}/filebeat-*/_search`, {
        "query": {
            "exists": {
                "field": "system.auth.sudo.command"
            }
        }
      }, {
        headers: {
            "Authorization": `ApiKey ${apiKey}`
        },
        httpsAgent: agent
      })

      return res.json(responseUtil.createSuccessResponse(
        result.data.hits.hits
      ));
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();

import { Request, Response } from "express";

export class ApiController {
  protected Unauthorized(res: Response, data: any) {
    res.status(401).json(data);
  }
}

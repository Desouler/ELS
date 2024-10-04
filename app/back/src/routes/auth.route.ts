import * as express from "express";
import { Request, Response, NextFunction } from "express";
import authController from "../controllers/auth.controller";
import { IRouting, ImportedRoute } from "./routing.interface";

@ImportedRoute.register
class AuthRoutes implements IRouting {
    prefix = "/elastic";

    register(app: express.Application) {
        app.post( `${this.prefix}/get`, ( req: Request, res: Response, next: NextFunction ) => {
            return authController.token(req, res, next);
        } );
    }
}
export default new AuthRoutes();
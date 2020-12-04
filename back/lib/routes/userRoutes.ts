
import { AuthController } from "controllers/authController";
import { Router } from "express";
import { UserController } from "../controllers/userController";
import { AuthController } from "../controllers/authController";

export class UserRoutes {

    router: Router;
    public userController: UserController = new UserController();
    public authController: AuthController = new AuthController();

    constructor() {
        this.router = Router();
        this.routes();
    }
    routes() {
        // For TEST only ! In production, you should use an Identity Provider !!
        this.router.post("/register", this.userController.registerUser);
        this.router.post("/login", this.userController.authenticateUser);
        this.router.get("/rut/:id",this.authController.authenticateJWT, this.userController.getUserByRUT);
        this.router.get("/",this.authController.authenticateJWT, this.userController.getUsers);

    }
}
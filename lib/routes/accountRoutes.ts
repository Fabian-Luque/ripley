import { Router } from "express";
import { AccountController } from "../controllers/accountController";
import { AuthController } from "../controllers/authController";


export class AccountRoutes {

    public router: Router;
    public accountController: AccountController = new AccountController();
    public authController: AuthController = new AuthController();

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get("/", this.accountController.getAccounts);
        this.router.get("/:id", this.accountController.getAccounts);
        this.router.post("/", this.authController.authenticateJWT, this.accountController.createAccount);
        this.router.put("/:id", this.authController.authenticateJWT, this.accountController.updateAccount);
        this.router.delete("/:id", this.authController.authenticateJWT, this.accountController.deleteAccount);
    }
}
import { Router } from "express";
import { TransferController } from "../controllers/transferController";
import { AuthController } from "../controllers/authController";


export class TransferRoutes {

    public router: Router;
    public transferController: TransferController = new TransferController();
    public authController: AuthController = new AuthController();

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get("/", this.transferController.getTransfers);
        this.router.get("/:id", this.transferController.getTransfer);
        this.router.get("/user/:id", this.transferController.getTransfersUser);
        this.router.post("/", this.authController.authenticateJWT, this.transferController.createTransfer);
        this.router.put("/:id", this.authController.authenticateJWT, this.transferController.updateTransfer);
        this.router.delete("/:id", this.authController.authenticateJWT, this.transferController.deleteTransfer);
    }
}
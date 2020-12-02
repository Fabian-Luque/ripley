import { Request, Response } from "express";
import { ITransfer, Transfer } from "../models/transfer";

export class TransferController {

    public async getTransfers(req: Request, res: Response): Promise<void> {
        const transfers = await Transfer.find();
        res.json({ transfers });
    }

    public async getTransfer(req: Request, res: Response): Promise<void> {
        const transfer = await Transfer.findOne({ transferId: req.params.id });
        if (transfer === null) {
            res.sendStatus(404);
        } else {
            res.json(transfer);
        }
    }

    public async createTransfer(req: Request, res: Response): Promise<void> {
        const newTransfer: ITransfer = new Transfer(req.body);
        const transfer = await Transfer.findOne({ transferId: req.body.transferId });
        if (transfer === null) {
            const result = await newTransfer.save();
            if (result === null) {
                res.sendStatus(500);
            } else {
                res.status(201).json({ status: 201, data: result });
            }

        } else {
            res.sendStatus(422);
        }
    }

    public async updateTransfer(req: Request, res: Response): Promise<void> {
        const transfer = await Transfer.findOneAndUpdate({ transferId: req.params.id }, req.body);
        if (transfer === null) {
            res.sendStatus(404);
        } else {
            const updatedTransfer = { transferId: req.params.id, ...req.body };
            res.json({ status: res.status, data: updatedTransfer });
        }
    }

    public async deleteTransfer(req: Request, res: Response): Promise<void> {
        const transfer = await Transfer.findOneAndDelete({ transferId: req.params.id });
        if (transfer === null) {
            res.sendStatus(404);
        } else {
            res.json({ response: "Transfer deleted Successfully" });
        }
    }
}
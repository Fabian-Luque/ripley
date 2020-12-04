import { Request, Response } from "express";
import { ITransfer, Transfer } from "../models/transfer";
import { IAccount, Account } from "../models/account";


export class TransferController {
    public async getTransfersUser(req: Request, res: Response): Promise<void> {
        try {
            const transfers = await Transfer.find().or([{receiver: req.params.id}, { origin: req.params.id}])
                                .populate("origin")
                                .populate("receiver");
            if (transfers === null) {
                res.sendStatus(404);
            } else {
                res.json(transfers);
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    public async getTransfers(req: Request, res: Response): Promise<void> {
        try {
            const transfers = await Transfer.find()
                                    .populate("origin")
                                    .populate("receiver");
            res.json({ transfers });
        } catch (error) {
            res.status(400).send(error.message); 
        }
    }

    public async getTransfer(req: Request, res: Response): Promise<void> {
        try {
            const transfer = await Transfer.findOne({ transferId: req.params.id });
            if (transfer === null) {
                res.sendStatus(404);
            } else {
                res.json(transfer);
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    public async createTransfer(req: Request, res: Response): Promise<void> {
        try {
            const newTransfer: ITransfer = new Transfer(req.body);
            const transfer = await Transfer.findOne({ transferId: newTransfer.transferId });
            
            if (newTransfer?.receiver) {
                // update account receiver
                const accountReceiver = await Account.findOne({ user: newTransfer.receiver });
                accountReceiver.amount = accountReceiver.amount + newTransfer.amount;
                let result = await accountReceiver.save();
                // update account receiver
                const accountOrigin = await Account.findOne({ user: newTransfer.origin });
                accountOrigin.amount = accountOrigin.amount - newTransfer.amount;
                let result2 = await accountOrigin.save();

            } else {
                const account = await Account.findOne({ user: newTransfer.origin });
                account.amount = account.amount + newTransfer.amount;
                let result = await  account.save();
                
            }

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
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    public async updateTransfer(req: Request, res: Response): Promise<void> {
        try {
            const transfer = await Transfer.findOneAndUpdate({ transferId: req.params.id }, req.body);
            if (transfer === null) {
                res.sendStatus(404);
            } else {
                const updatedTransfer = { transferId: req.params.id, ...req.body };
                res.json({ status: res.status, data: updatedTransfer });
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    public async deleteTransfer(req: Request, res: Response): Promise<void> {
        try {
            const transfer = await Transfer.findOneAndDelete({ transferId: req.params.id });
            if (transfer === null) {
                res.sendStatus(404);
            } else {
                res.json({ response: "Transfer deleted Successfully" });
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}
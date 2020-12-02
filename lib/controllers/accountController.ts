import { Request, Response } from "express";
import { IAccount, Account } from "../models/account";

export class AccountController {

    public async getAccounts(req: Request, res: Response): Promise<void> {
        const accounts = await Account.find();
        res.json({ accounts });
    }

    public async getAccount(req: Request, res: Response): Promise<void> {
        const account = await Account.findOne({ accountId: req.params.id });
        if (account === null) {
            res.sendStatus(404);
        } else {
            res.json(account);
        }
    }

    public async createAccount(req: Request, res: Response): Promise<void> {
        console.log(req.body);
        
        const newAccount: IAccount = new Account(req.body);
        const account = await Account.findOne({ accountId: req.body.accountId });
        if (account === null) {
            const result = await newAccount.save();
            if (result === null) {
                res.sendStatus(500);
            } else {
                res.status(201).json({ status: 201, data: result });
            }

        } else {
            res.sendStatus(422);
        }
    }

    public async updateAccount(req: Request, res: Response): Promise<void> {
        const account = await Account.findOneAndUpdate({ accountId: req.params.id }, req.body);
        if (account === null) {
            res.sendStatus(404);
        } else {
            const updatedAccount = { accountId: req.params.id, ...req.body };
            res.json({ status: res.status, data: updatedAccount });
        }
    }

    public async deleteAccount(req: Request, res: Response): Promise<void> {
        const account = await Account.findOneAndDelete({ accountId: req.params.id });
        if (account === null) {
            res.sendStatus(404);
        } else {
            res.json({ response: "Account deleted Successfully" });
        }
    }
}

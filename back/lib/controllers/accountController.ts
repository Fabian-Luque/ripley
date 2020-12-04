import { Request, Response } from "express";
import { IAccount, Account } from "../models/account";

export class AccountController {

    public async getAccounts(req: Request, res: Response): Promise<void> {
        try {
            const accounts = await Account.find();
            res.json({ accounts });
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    public async getAccount(req: Request, res: Response): Promise<void> {
        try {
            const account = await Account.findOne({ accountId: req.params.id });
            if (account === null) {
                res.sendStatus(404);
            } else {
                res.json(account);
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    public async getAccountUser(req: Request, res: Response): Promise<void> {
        try {
            const account = await Account.findOne({ user: req.params.id });
            if (account === null) {
                res.sendStatus(404);
            } else {
                res.json(account);
            }
            
        } catch (error) {
            res.status(400).send(error.message);
        }
    }


    public async createAccount(req: Request, res: Response): Promise<void> {
        try {
            const newAccount: IAccount = new Account(req.body);
            const exist = await Account.findOne({ user: newAccount.user });

            if (exist) {
                res.status(200).json({ status: 200, data: exist });
                return;
            }
            const account = await Account.findOne({ accountId: newAccount.accountId });
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
        } catch (error) {
            res.status(400).send(error.message);
        }
        
    }

    public async updateAccount(req: Request, res: Response): Promise<void> {
        try {
            const account = await Account.findOneAndUpdate({ accountId: req.params.id }, req.body);
            if (account === null) {
                res.sendStatus(404);
            } else {
                const updatedAccount = { accountId: req.params.id, ...req.body };
                res.json({ status: res.status, data: updatedAccount });
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    public async deleteAccount(req: Request, res: Response): Promise<void> {
        try {
            const account = await Account.findOneAndDelete({ accountId: req.params.id });
            if (account === null) {
                res.sendStatus(404);
            } else {
                res.json({ response: "Account deleted Successfully" });
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}

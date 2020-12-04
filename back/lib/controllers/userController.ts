import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { IAccount, Account } from "../models/account";
import "../auth/passportHandler";
import { User } from "../models/user";
import { JWT_SECRET } from "../util/secrets";


export class UserController {

    public async registerUser(req: Request, res: Response): Promise<void> {
        try {
            const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
            // Create user
            const user: any = await User.create({
                name: req.body.name,
                password: hashedPassword,
                rut: req.body.rut,
                email: req.body.email.toLowerCase()
            });
            
            // Create account
            const newAccount: IAccount = new Account({
                user: user._id,
                amount: 0
            });
            let account = await newAccount.save();


            const token = jwt.sign({ email: req.body.email, scope : req.body.scope }, JWT_SECRET);
            
            const resp = {
                token,
                id: user._id,
                name: user.name,
                RUT: user.rut,
                email: user.email,
            }
            res.status(200).send(resp);
        } catch (error) {
            res.status(400).send('email must be unique');
        }
        
    }

    public authenticateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body;
            User.findOne({ email: email.toLowerCase() }, (err, user: any) => {
                if (!user) {
                return res.status(401).json({ status: "error", code: "unauthorized" });
                } else {
                    bcrypt.compare(password, user.password, (err: Error, isMatch: boolean) => {
                        if (!isMatch) return res.status(401).json({ status: "error", code: "unauthorized" });
                        const token = jwt.sign({ email: req.body.email }, JWT_SECRET);
                        const resp = {
                            token,
                            id: user._id,
                            name: user.name,
                            RUT: user.rut,
                            email: user.email,
                        }
                        res.status(200).send(resp);
                    });
                }
            }); 
        } catch (error) {
            res.status(400).send(error.message);
        }
        
        
    }

    public async  getUsers(req: Request, res: Response, next: NextFunction) {
        const transfers = await User.find();
        res.json({ transfers });
    }

    public async  getUserByRUT(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await User.findOne({ rut: req.params.id });
            if (user === null) {
                res.sendStatus(404);
            } else {
                res.json(user);
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

}
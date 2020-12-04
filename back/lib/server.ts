import express from "express";
import mongoose from "mongoose";
import compression from "compression";
import cors from "cors";
import passport from "passport";

import { MONGODB_URI } from "./util/secrets";

import { AccountRoutes } from "./routes/accountRoutes";
import { TransferRoutes } from "./routes/transferRoutes";
import { UserRoutes } from "./routes/userRoutes";

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.mongo();
  }

  public config(): void {
    this.app.set("port", process.env.PORT || 3000);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(compression());
    this.app.use(cors());
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  public routes(): void {
    this.app.use("/api/user", new UserRoutes().router);
    this.app.use("/api/account", new AccountRoutes().router);
    this.app.use("/api/transfer", new TransferRoutes().router);
  }

  private mongo() {
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Mongo Connection Established");
    });
    connection.on("reconnected", () => {
      console.log("Mongo Connection Reestablished");
    });
    connection.on("disconnected", () => {
      console.log("Mongo Connection Disconnected");
      console.log("Trying to reconnect to Mongo ...");
      setTimeout(() => {
        mongoose.connect(MONGODB_URI, {
          useNewUrlParser: true, keepAlive: true,
          socketTimeoutMS: 3000, connectTimeoutMS: 3000, 
          useUnifiedTopology: true, useFindAndModify: false, 
          useCreateIndex: true,
        });
      }, 3000);
    });
    connection.on("close", () => {
      console.log("Mongo Connection Closed");
    });
    connection.on("error", (error: Error) => {
      console.log("Mongo Connection ERROR: " + error);
    });
    
    const run = async () => {
      await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
    };
    run().catch(error => console.error(error));
  }


  public start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log(
        "API is running at http://localhost:%d",
        this.app.get("port")
      );
    });
  }

}

const server = new Server();

server.start();
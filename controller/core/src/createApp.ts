import express from "express";
import cors from "cors";
import router from "./routes/functions";

export function createApp() {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use('/api/functions', router);
    return app;
}
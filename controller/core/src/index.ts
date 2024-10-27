import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/functions";
import FunctionModel from './models/functions';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Connect to MongoDB using Mongoose

if (!process.env.MONGODB_URI || !process.env.DATABASE_NAME) {
    console.error("Please define the MONGODB_URI and DATABASE_NAME environment variable.");
    process.exit(1);
}
const dbUri = `${process.env.DATABASE_URI}/${process.env.DATABASE_NAME}`;
mongoose.connect(dbUri)
.then(() => {
    console.log("Connected to MongoDB successfully");
})
.catch((error) => {
    console.error("MongoDB connection error:", error);
});

// Routes
app.use('/api/functions', router);

// Root route
app.get('/api/functions', (request, response) => {
    response.send("API is running");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});

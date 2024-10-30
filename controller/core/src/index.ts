import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/functions";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Routes
app.use('/api/functions', router);
// Root route
app.get('/api/functions', (request, response) => {
    response.send("API is running");
});

// Start the server
if (process.env.NODE_ENV !== 'test'){
    app.listen(PORT, () => {
        console.log(`Running on port ${PORT}`);
    });
}

module.exports = app;

import express from "express";
import Connect from "./config/data.js";
import router from "./routes/productRoute.js";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors"
await Connect()
const app = express();

const PORT = process.env.PORT;

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json());
app.use("/api", router)
app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => {
    console.log("Backend Server is on")
})

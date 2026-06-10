import express from "express";
import Connect from "./config/data.js";
import router from "./routes/productRoute.js";
import dotenv from "dotenv";
dotenv.config();

await Connect()
const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use("/api", router)



app.listen(PORT, () => {
    console.log("Backend Server is on")
})

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function Connect() {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log("DB connection:OK , Server Running OK")
    }).catch((err) => {
        console.log(err)
    })

}
export default Connect
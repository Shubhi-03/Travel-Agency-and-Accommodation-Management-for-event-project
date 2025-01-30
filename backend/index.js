
import dotenv from "dotenv";
import {app} from "./app.js";
import connectDB from "./src/db/index.js";
dotenv.config({
    path: './.env'
})
const PORT = process.env.PORT || 3001;

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log("EMAIL_SERVICE_ID:", `"${process.env.EMAIL_SERVICE_ID}"`);
console.log("EMAIL_SERVICE_PASSWORD:", `"${process.env.EMAIL_SERVICE_PASSWORD}"`);

    });
    
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})


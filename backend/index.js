
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
        

    });
    
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})


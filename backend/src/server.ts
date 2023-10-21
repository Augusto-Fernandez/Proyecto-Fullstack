import "dotenv/config";
import env from "./util/validateEnv";
import mongoose from "mongoose";

import app from "./app";

const port = env.NODE_PORT;

mongoose.connect(env.DB_URI).then(() =>{
    console.log("Mongoose Connected");
    app.listen(port, ()=>{
        console.log("Server listening on port: "+port);
    });
}).catch(console.error);

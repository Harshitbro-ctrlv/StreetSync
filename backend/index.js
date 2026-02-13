import 'dotenv/config'
import {ConnectDb}  from "./db/connectToDb.js";
import  app from "./app.js";

ConnectDb().then(
    ()=>{
        app.listen(process.env.PORT,()=>{
            console.log("app started to listen on port 3000")
        })
    }
).catch(()=>{
    console.log("something went wrong")
})
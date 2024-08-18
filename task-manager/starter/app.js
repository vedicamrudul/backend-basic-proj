const express=require('express');
require('./db/connect')
const run=require('./db/connect')

const taskRoutes=require("./routes/tasks");

const app=express();

const port=3000;

app.use(express.json())
app.use('/api/v1/tasks', taskRoutes)

const start=async()=>{
    try{
        await run().catch(console.dir);
        app.listen(port, ()=>{
            console.log(`Server is listening on port ${port}`)
        })
    }catch(e){
        console.log(e)
    }
}

start()

const Task = require('../Models/Task');
const asyncWrapper=require("../middlewear/async");
const { createCustomError } = require('../errors/CustomApiError');

const getAllTasks= asyncWrapper( async (req,res)=>{
        const tasks=await Task.find({});
        // there are many conventions of sending data back to the client.
        res.status(200).json({tasks})
        // this is what we are using rn.
        // the below are other common conventions.
        // res.status(200).json({tasks, amount: tasks.length})
        // res.status(200).json({status: "success", data: {tasks}})
})

// Without asyncWrapper to handle try and catch: 

// const getAllTasks=  async (req,res)=>{
//     try{
//         const tasks=await Task.find({});
//         res.status(200).json({tasks})
//     }catch(err){
//         res.status(500).json({msg: "error fetching tasks"})
//     }
// }

const getSingleTask=asyncWrapper( async (req,res,next)=>{
        const task=await Task.findById(req.params.id);
        // this returns null if no task is found
        if(task){
        res.status(200).json({task})
        }
        if(!task){
            // 404 is the error code for - not found
            // return res.status(404).json({msg: `no task with id of ${req.params.id}`})
            // we can also use the custom error handler
            return next(createCustomError(`no task with id of ${req.params.id}`, 404))
        }
})
const createTask= asyncWrapper( async (req,res)=>{
    const task=await Task.create(req.body);
    res.status(201).json({task}) 
})
const updateTask= asyncWrapper(async (req,res)=>{
        // lets update the task
        const task=await Task.findOneAndUpdate({_id:req.params.id}, req.body, {new: true, runValidators: true}); 
        // the new options returns the updated task; if you dont use new then then the function will return the old/unupdated task.
        // the runValidators option will run the validators in the schema (null na ho ya wtv)
        if(!task){
            // return res.status(404).json({msg: `no task with id of ${req.params.id}`})
            return next(createCustomError(`no task with id of ${req.params.id}`, 404))
        }
        res.status(200).json({task})
})
const deleteTask=  asyncWrapper(async (req,res)=>{
    const task=await Task.findByIdAndDelete(req.params.id);
    if(!task){
        // return res.status(404).json({msg: `no task with id of ${req.params.id}`})
        return next(createCustomError(`no task with id of ${req.params.id}`, 404))
    }
    res.status(200).json({successful: true})
})

module.exports={
    getAllTasks,
    getSingleTask,
    createTask,
    updateTask,
    deleteTask
}
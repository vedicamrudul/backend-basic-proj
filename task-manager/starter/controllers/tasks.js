const Task = require('../Models/Task');

const getAllTasks=(req,res)=>{
    res.json({items: "all tasks"});
}
const getSingleTask=(req,res)=>{
    res.json({items: `get task with id of ${req.params.id}`})
}
const createTask= async (req,res)=>{
    const task=await Task.create(req.body);
    res.status(201).json({task})
}
const updateTask=(req,res)=>{
    res.json({items: `update task with id of ${req.params.id}`})
}
const deleteTask=(req,res)=>{
    res.json({items: `delete task with id of ${req.params.id}`})
}

module.exports={
    getAllTasks,
    getSingleTask,
    createTask,
    updateTask,
    deleteTask
}
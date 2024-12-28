const getAllJobs=async (req,res)=>{
    res.json({msg: "get all jobs route"})
}
const getJob=async (req,res)=>{
    res.json({msg: "get one job route"})
}
const deleteJob=async (req,res)=>{
    res.json({msg: "delete job route"})
}
const updateJob=async (req,res)=>{
    res.json({msg: "update job route"})
}
const createJob=async (req,res)=>{
    res.json({msg: "create job route"})
}

module.exports={
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}
import * as React from "react"
import { useState,useEffect } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, PlusCircle, CheckCircle2 } from "lucide-react"
import { s, use } from "framer-motion/client"
import { UpdateIcon } from "@radix-ui/react-icons"

export default function CuteTaskManagerCard() {
  const [tasks, setTasks] = useState<string[]>([])
  const [newTask, setNewTask] = useState("")

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/tasks").then((response) => {
        console.log(response.data.tasks)
      setTasks(response.data.tasks)
    })
  }, [])

 const updateCompleted = async (id: string) => {
    await axios.put(`http://localhost:3000/api/v1/tasks/${id}`, {
      completed: true,
    })
    setTasks(tasks.map((task) => task._id === id ? { ...task, completed: true } : task))
    }



   const addTask= async () => {
    const response = await axios.post("http://localhost:3000/api/v1/tasks", {
      name: newTask,
    })
    setTasks([...tasks, response.data.task])
    setNewTask("")
    }

  const deleteTask = async (id: string) => {
    await axios.delete(`http://localhost:3000/api/v1/tasks/${id}`)
    setTasks(tasks.filter((task) => task._id !== id))
  }
 
  return (
    <Card className="w-[350px] bg-gradient-to-br z-50 from-pink-100 to-purple-100 border-2 border-pink-200 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-purple-600">Task List</CardTitle>
        <CardDescription className="text-pink-500">Add your tasks here!</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => { e.preventDefault(); addTask(); }}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="task" className="text-purple-600">New Task</Label>
              <div className="flex">
                <Input
                  id="task"
                  placeholder="Enter a cute task..."
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  className="rounded-r-none border-2 border-r-0 border-pink-200 focus:border-purple-300 focus:ring-purple-300"
                />
                <Button
                  type="submit"
                  className="rounded-l-none bg-pink-400 hover:bg-pink-500 text-white"
                >
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </form>
        <div className="mt-6 space-y-2">
          {tasks.map((task, index) => (
            <div key={index} className="flex items-center justify-between bg-white rounded-lg p-2 shadow">
              <div className="flex items-center space-x-2">
                { task.completed ? <CheckCircle2 className="h-5 w-5 text-green-400" /> : <button className="h-5 w-5 border-2 border-gray-300 rounded-full" onClick={()=> updateCompleted(task._id)}> X </button> }
                <span className="text-gray-700">{task.name}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteTask(task._id)}
                className="text-red-400 hover:text-red-600 hover:bg-red-100"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-purple-500">You have {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}!</p>
      </CardFooter>
    </Card>
  )
}
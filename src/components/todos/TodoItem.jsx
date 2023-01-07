import React, { useContext, useEffect, useState } from 'react'
import { MdEdit,MdDelete } from "react-icons/md"
import TodoContext from '../../context/TodoContext'

function TodoItem({taskObj}) {
  const {editTask, deleteTask}=useContext(TodoContext)

  const [taskInProgress, setTaskInProgress]=useState(true)

  const date=taskObj.date.split('-')
  const time=taskObj.time.split(':')
  const dueDate=new Date(date[0], +date[1]-1,date[2],time[0],time[1])

  useEffect(()=>{
    const todayDate=new Date()

    const status=todayDate<dueDate
    if(status===false){
      setTaskInProgress(status)
    }

  },[])


  
 const intervalID=setInterval(()=>{
    const todayDate=new Date()

    const status=todayDate<dueDate
    if(status===false){
      setTaskInProgress(status)
      clearInterval(intervalID)
    }
    
    console.log('status',taskInProgress)
  },60000)

  


  return (
   
    <div className="relative  border border-base-300 bg-base-100 rounded mb-2 text-md font-medium py-3 px-2 hover:">
        <p className="md:w-[80%]">{taskObj.task}</p>
            { taskInProgress&&
            <div className="inline tooltip absolute top-1 right-3  mr-3 text-sky-500 hover:cursor-pointer" data-tip='Edit todo'>
              <MdEdit className='pr-1' onClick={()=>{
                    editTask(taskObj)
                }} data-tip='Edit task'/>
        
            </div>}
             
          <div className="inline tooltip text-red-500 absolute top-1  right-1 hover:cursor-pointer" data-tip='Delete todo'>
              <MdDelete className=' pr-1 ' onClick={()=>{
                deleteTask(taskObj)
              }}/>
          </div>
          
          <p className='text-[8px] static md:top-5 md:right-2 md:absolute'>Create On: {taskObj.created_at}</p> 
          {taskInProgress ?<p className='text-[8px] static md:top-7 md:right-2 md:absolute'>Due On: {taskObj.date}T{taskObj.time} {`${+taskObj.time.split(':').shift()>12?'PM': "AM"}`} </p>: <p className='text-[8px] static md:top-7 md:right-2 md:absolute text-green-400'>Completed</p> }
          
    </div>

  )
}

export default TodoItem

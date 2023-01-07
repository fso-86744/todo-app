import React, { useEffect, useState, useContext } from 'react'
import TodoContext from '../context/TodoContext'

function TodoForm() {
  // const todayDate=new Date().toJSON()
  const [task, setTask]=useState('')
  const [date, setDate]=useState('')
  const [time ,setTime]=useState('')
  const [btnDisable, setBtnDisable]=useState(false)

  //using context for states
  const {addEditTask,addTask,todoEdit,todos}=useContext(TodoContext)

  //on mounting component
  useEffect(()=>(
    inputsValidator()
  ),[date,task, time])


  //on clicking edit icon
  useEffect(()=>{
    if(todoEdit.edit===true){
       setTask(todoEdit.item.task)
       setDate(todoEdit.item.date)
       setTime(todoEdit.item.time)
    }
},[todoEdit])
  

  
  //handling changes in task 
  const handleTaskChange=(event)=>{
          setTask(event.target.value)
          console.log(task)
  }

  const handleDateChange=(event)=>{
          setDate(event.target.value)
          console.log(date)
  }

  const handleTimeChange=(event)=>{
          setTime(event.target.value)
          console.log(time)
  }

  const inputsValidator =()=>{
    if(task===''||date===''|| time===''){
       setBtnDisable(true)
    }else{
      setBtnDisable(false)
    }
  }


  //handle submit
  const handleSumit=(event)=>{
    event.preventDefault()
    
    if(todoEdit.edit===false){
      const dateToday=new Date()
      const created_at= `${dateToday.getFullYear()}-${+dateToday.getMonth()<10 ? `0${+dateToday.getMonth()+1}`: +dateToday.getMonth()+1}-${dateToday.getDay()}T${+dateToday.getHours()<10? `0${dateToday.getHours()}`:dateToday.getHours()}:${dateToday.getMinutes()} ${dateToday.getHours>12? 'PM': 'AM'}`
      
     
      addTask({ task,date,time, created_at})
      setTask('')
      setDate('')
      setTime('')
    
    }else{
       addEditTask({task,date,time, created_at: todoEdit.item.created_at},todoEdit.item.id)
       setTask('')
      setDate('')
      setTime('')
    }
    

  }

  return (
    <div className='bg-[#fff] my-12 rounded p-4'>
      <form  onSubmit={handleSumit}>
          <label className="relative block mb-8">
            <span className="sr-only">Add task</span>
            <div className="hidden md:inline absolute inset-y-0 pt-[3px] right-0 flex items-center justify-center pr-2">
                <button type="submit" className={`btn px-6 self-center capitalize btn-sm rounded text-white bg-sky-500 border-none hover:bg-[#3b71ac] `} disabled={btnDisable}>Add</button>
            </div>
            <input className=" placeholder:text-slate-700 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 pl-[7px] shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Add new..." type="text" name="search" onChange={
              handleTaskChange
            } value={task}/>
         </label>
    
         <button type="submit" className={` md:hidden block btn px-6 capitalize btn-sm  -mt-4 mb-1 rounded text-white bg-sky-500 border-none hover:bg-[#3b71ac] `} disabled={btnDisable}>Add</button>


         <div className="flex  flex-col  gap-2 md:flex-row md:justify-between md:items-center text-slate-700">
            <label className="block justify-center items-center">
                <span className=" text-2xl">Due Date: </span>
                  <input type="date" className=" mt-1  text-slate-400 bg-transparent  border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" onChange={handleDateChange
                  } value={date}/>
            </label>
            <label className="block justify-center items-center">
                <span className=" text-2xl">Due Time: </span>
                  <input type="time" className=" mt-1 text-slate-400 bg-transparent  border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" onChange={handleTimeChange
                  } value={time}  />
            </label>
         </div>
         

        
      


      </form>
    </div>
  )
}

export default TodoForm

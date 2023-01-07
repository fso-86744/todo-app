import { createContext, useEffect, useReducer } from "react";
import todoReducer from "./TodoReducer";


const TodoContext=createContext()

export const TodoProvider=({children})=>{
    const initialState={
        todos:[],
        loading: true,
        todoEdit:{
            item: {},
            edit: false
        }
    }

    const[state, dispatch]=useReducer(todoReducer, initialState)


    //fetch tasks on load
    useEffect(()=>{
         getTasks()
    },[])




    //get todos
    const getTasks= async ()=>{
        const response =await fetch('/todos')

        const data= await response.json()

        dispatch({
            type: 'GET_TASKS',
            payload: data
        })
    }
    

    //add tasks
    const addTask= async (task)=>{
        
        const response=await fetch('/todos?_sort=date&_time=desc',
           {
            method:"POST",
            headers:{
                "Content-Type":'application/json'
            },

            body: JSON.stringify(task)
        })
        const data= await response.json()

        console.log('addtask', data)
        dispatch({
            type: 'ADD_TASK',
            payload: data
        })   
    }

    const editTask=(task)=>{
        dispatch({
            type: 'EDIT_TASK',
            payload: task
        })
        console.log('edit', task)
    }

    const addEditTask=async (update,id)=>{
        const response= await fetch(`/todos/${id}`,{
            method: 'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(update)
        })

        const data= await response.json()
        console.log(update)
         
        const  editedTodos= state.todos.map(task=>{

                 if(task.id===id){
                  return data
                }
                  return task
                 }
                 
              )
          

        dispatch({
            type:'ADD_EDIT',
            payload: editedTodos
        })
    }

    const deleteTask=async (todo)=>{

        await fetch(`/todos/${todo.id}`,{method:"DELETE"})

       
        const newTodos=state.todos.filter((task)=>{
            return task.id!==todo.id
        })
        
        console.log('newTodos',newTodos)
    
        dispatch({
            type:'DELETE_TASK',
            payload: newTodos
        })
    }


    return(
        <TodoContext.Provider value={{todos: state.todos, loading:state.loading, todoEdit:state.todoEdit, addTask, addEditTask, editTask, deleteTask}}>
            {children}
        </TodoContext.Provider>
    )

}

export default TodoContext
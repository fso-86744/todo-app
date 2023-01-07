import TodoItem from './TodoItem'
import TodoContext from '../../context/TodoContext'
import { useContext } from 'react'

function TodoList() {
  const {todos}=useContext(TodoContext)


  if(todos.length===0){
    return(
      <p>No Tasks Yet</p>
    )
  }else{
    return (
      <div>
         {
           todos.map((task)=>{
            return <TodoItem taskObj={task} key={Math.random().toFixed(8)}/>
           })
         }
      </div>
    )

  }
  
}

export default TodoList

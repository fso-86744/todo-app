import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/todos/TodoList";
import {TodoProvider} from "./context/TodoContext";



function App() {

  return (
    <TodoProvider>
         <div className=" mx-auto card max-w-[80%] bg-[#ccc] py-8 px-12">
          <Header/>
          <TodoForm/>
          <div className="h-2 w-full my-2 border-2 border-white rounded-md"></div>
          <TodoList/>
        </div>
    </TodoProvider>
   
  );
}

export default App;

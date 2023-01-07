
export default function todoReducer(state,action){

    switch(action.type){
        case "GET_TASKS":
            return{
                ...state,
                todos: action.payload
            }

        case 'ADD_TASK':
            return{
                ...state,
                todos: [action.payload,...state.todos]
            }

        case 'ADD_EDIT':
            return{
                ...state,
                todos: action.payload,
                todoEdit:{
                    item:{},
                    edit:false

                }
                
            } 

        case 'EDIT_TASK':
            return{
                ...state,
                todoEdit:{
                    edit: true,
                    item: action.payload
                }
            } 
            
        case 'DELETE_TASK':
            return{
                ...state,
                todos: action.payload
            }    
        default:
            return state
    }

}
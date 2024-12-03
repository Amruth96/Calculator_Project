import { useReducer } from "react";

function countReducer(state, action){
    switch(action.type){
        case 'increment' :
            return{count : state.count+1}
        case 'decrement' :
            return{count : state.count-1}
        default :
            return state
    }
}



const Counter =()=>{

    const[state,dispatch]= useReducer (countReducer, {count:0})
        return(
            <div>
                <p>Count : {state.count}</p>
                <button onClick={()=>dispatch({type: 'increment'})}>+</button>
                <button onClick={()=>dispatch({type: 'decrement'})}>-</button>
            </div>
        )
}
export default Counter;
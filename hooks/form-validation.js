import { useReducer } from "react";

export default function useValidation(valFun){


    // const [input,setInput] = useState('')
    // const [inputTouched,setInputTouched] = useState(false)

    const callbackHandler = (ip) =>{
        // setInput(ip)
        dispatchFn({type:"ONCHANGE",val:ip})
    }

    const [reducer,dispatchFn] = useReducer((state,action)=>{

        if(action.type==="ONBLUR"){
            return {
                ...state,
                inputTouched:true
            }
        }

        if(action.type==="ONCHANGE"){
            return {
                input:action.val,
                inputTouched:state.inputTouched
            }
        }
        return state
    },{input:'',inputTouched:false})

    const toggleActiveHandler = () =>{
        // setInputTouched(true)
        dispatchFn({type:"ONBLUR"})
    }

    
    const inputIsValid = valFun(reducer.input)
    const inputIsInValid = !inputIsValid && reducer.inputTouched

    return {
        input:reducer.input,
        inputIsValid,
        inputIsInValid,
        callbackHandler,
        toggleActiveHandler
    }


}
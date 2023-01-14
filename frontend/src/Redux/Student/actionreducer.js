import * as types from "./actionTypes";

const InitialState = {
    student : [],
    test:[]
};

export const studentReducer = (state=InitialState,action)=>{
    const {type,payload}=action

    switch(type){
        case types.STUDENT_GET_DATA:{
            return{
                ...state,
                student:payload
            }
        }
        case types.STUDENT_SEARCH_GET_DATA:{
            console.log("reducerstudnt",state.student,"payload",payload)
            return{
                ...state,
                student:payload,
            }
        }
        case types.TEST_GET_DATA:{
            return{
                ...state,
                student:payload,
            }
        }
        default:{
            return state
        }
    }

}
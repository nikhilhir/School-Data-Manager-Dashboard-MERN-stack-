import * as types from "./actionTypes"
import axios from "axios"


const getStudentData = (skip)=>(dispatch)=>{
    if(skip === undefined){
        skip=0
    }
    console.log("skip",skip)
    axios.get(`http://localhost:8080/student/studentdata/${5}/${skip}`)
    .then((res)=>{
        console.log("get data",res)
        dispatch({type:types.STUDENT_GET_DATA,payload:res.data})
    })
}

const addStudentData = (data)=>()=>{
   
    axios
    .post(`http://localhost:8080/auth/signup`,data)
    .then((res)=>{
        return types.STUDENT_ADD_DATA;
    })
    .catch((err)=>{
        return "user exist"
    })
}

const deleteStudentData = (id) => (dispatch)=>{
     
    axios
    .delete(`http://localhost:8080/student/delete/${id}`)
    .then((res)=>{
        console.log("deleted data",res)
        dispatch({type:types.STUDENT_DELETE_DATA})
        return types.STUDENT_DELETE_DATA;
    })
}

const getTestData = (id)=>(dispatch)=>{
   
    axios.get(`http://localhost:8080/student/user/${id}`)
    .then((res)=>{
        console.log(res)
        dispatch({type:types.TEST_GET_DATA,payload:res.data.FindStudent})
    })
}

const addTestData = (data,id)=>(dispatch)=>{
    axios
    .get(`http://localhost:8080/student/create/${id}`,data)
    .then((res)=>{
        console.log(res);
        dispatch({type:types.TEST_ADD_DATA,payload:res.data})
    })
}

const deleteTestData = (id)=>(dispatch)=>{
   
    axios
    .delete(`http://localhost:8080/student/delete/test/${id}`)
    .then((res)=>{
        console.log("delete test",res)
        return types.TEST_DELETE_DATA
    })
}

const serchTitle = (title) =>(dispatch)=>{
    axios
    .get(`http://localhost:8080/student/searchtitle/${title}`)
    .then((res)=>{
        console.log(res.data)
        dispatch({type:types.STUDENT_SEARCH_GET_DATA,payload:res.data})
    })
}

const query = (filterBy,sortBy)=>(dispatch)=>{
    if(filterBy.length > 0 || sortBy.length > 0){
        axios
        .get(`http://localhost:8080/student/query/${filterBy},${sortBy}`)
        .then((res)=>{
            console.log("sort responce",res)
            dispatch({type:types.STUDENT_QUERY_GET_DATA,payload:res.data})
        })

    }else{
        dispatch(getStudentData())
    }
}

const token = localStorage.getItem("token")

const getTestDataforStudent = ()=>(dispatch)=>{
    axios
    .get(`http://localhost:8080/student`,{
        headers:{
            Authorization:token
        },
    })
    .then((res)=>{
        console.log("test for student",res)
        dispatch({type:types.TEST_GET_DATA,payload:res.data})
    })
}

const updateTestData = (id,data)=>(dispatch)=>{
    axios
    .patch(`http://localhost:8080/student/edittestxompletion/${id}`,data)
    .then((res)=>{
        console.log("update response for test",res)
    })
}

module.exports={getStudentData,addStudentData,deleteStudentData,getTestData,
    addTestData,deleteTestData,serchTitle,query,getTestDataforStudent,updateTestData}
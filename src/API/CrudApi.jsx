//! Full stack CRUD operation( Work(HTTP method)- Create(Post), Read(Get), Update(Put / Patch), Delete(Delete)) 

import axios from "axios";

//* create instance of axios-
const api=axios.create({
    baseURL:"https://jsonplaceholder.typicode.com",
})


//* Function create for get request (HTTP get method- api.get)-
export const getReqApi=()=>{
    return api.get("/posts");                        // when getReqApi function call /posts route baseURL m append ho jay-egi
}



//* (Http Delete method- api.delete)-
export const delReqApi=(id)=>{                     //id get ki hai fun. k through then uss id k basis pr data delete kar te hai 
    return api.delete(`/posts/${id}`)              //@ Note- here id ko direct pass nhi kar sk-te hai because ye default ho jay-ega but here hme data delete kar-ne k li ye value ko dynamic banana ho ga 
}



//* (Http Post method- api.post)-
export const postReqApi=(data)=>{                //data get as a parameter from form submit
    return api.post("/posts", data)               //@ data(payload) add like this way 
}


//* (Http Put method- api.put)-
export const PutReqApi=(id,data)=>{              // id and data get as a parameter , must be use when put(entire data) and patch(minimal data) method used for update date  
    return api.put(`/posts/${id}`,data)         // unique id use for which data we want update , data is basically new data that replace old data
}
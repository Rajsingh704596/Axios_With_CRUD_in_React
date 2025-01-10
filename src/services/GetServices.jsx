//! Axios use better way for CRUD operation( Work(HTTP method)- Create(Post), Read(Get), Update(Put / Patch), Delete(Delete))  -

//todo-  http://www.pronteff.com/page.html?parameter1=[@field:fieldname1]&parameter2=[@field:fieldname2]
//todo-  URL- http://www.pronteff.com/page.html  , Query String Begin -? , Parameter Name-parameter1 , Parameter Value-[@field:field_name1] , Query String Separator - &

import axios from "axios";

//^ axios instance create , inside create method object pass where key is baseURL and value is API's URL as a object property
const api=axios.create({
       baseURL: "https:/www.omdbapi.com",
})

//^ Creating a get req function and return api(jo ki instance h api ka).get("Query string begin to end link use , except baseURL")
export const getReq=()=>{
 
    return api.get("/?i=tt3896198&apikey=1c12799f&s=titanic&page=1");
}



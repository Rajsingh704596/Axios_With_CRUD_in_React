/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { postReqApi, PutReqApi } from "./API/CrudApi";

export const FormPostData=({jsonData, setJsonData, editUpdateData, setEditUpdateData})=>{       //props destructure get useState which store Api value
     
    //^ Input field ka data object k form m get kar ne k li another useState hook create ki ya hai and input value ko api m pass kar ke wa-pis state ko reset kar de ge 
    const[addData,setAddData]=useState({
        title:"",
        body:"",
    });


    const handleInputChange=(e)=>{   //event object get by default
        // const name=e.target.name;
        // const value=e.target.value;
        const{name,value}=e.target;
        setAddData((prev)=>{
            // console.log(prev);               //o/p- {title:'', body:''}
            return(
                { ...prev, [name]:value }        //name(key)is dynamic , so value store dynamically when name is title so value is title input field , when name is body so value is body input field , (means key basis pr value store dynamically)
            )}
        )
    }


    const postReqFunction=async()=>{
        try {
            const res=await postReqApi(addData);     //^ postReqApi fun call with addData(curState of input field value in form which we want to post and store in api) argument pass
         //    console.log("response",res);         // response {data: {…}, status: 201, statusText: '', headers: AxiosHeaders, config: {…}, …}
            
            if(res.status===201){
              setJsonData([...jsonData,res.data])    //^setJsonData fun (updated fun of useState jo ki api data store kara hua h)m (array create [ ... jsonData as a tease rhe(api ka), or new data add kar-ege res.data se(jis me after postReq response m addData ki value get hui hai object form {body:"test", id:101, title:"work done"}m hai )  ])

              //^reset input field
              setAddData({title:"", body:""});
            }
        } catch (error) {
            console.log(error)
        }
    }


     //^ get the edit updated data and add into input field (store in addData state )
     useEffect(()=>{                              //agar editUpdateData hai tb hi run ho code and input field wo current data show ho ja ye
        editUpdateData && setAddData({                  
            title: editUpdateData.title || "",   //OR operator use agar value nhi hai to empty rhe-ga
            body : editUpdateData.body || "",
        });
    },[editUpdateData]);   // dependency array se jb jb user edit pr click kar-ega useEffect re-run ho ga

    
    //todo- Variable create to check editUpdateData state is empty or not          
    //^ here we use Object.keys method that return array of object key , than we use length property to get value ( In object this process use but in array normal array.length we get data)
             // const Obj={a:"",b:""};   
             // Object.keys(Obj)       //o/p- ['a',' b']
             // const Obj2={};   
             // Object.keys(Obj2)       //o/p- []
    //^here we check editUpdateData which is empty object (in initial state) 
    let isEmpty= Object.keys(editUpdateData).length === 0;          //agar editUpdateData is empty object{} than equal to 0 value so isEmpty value is True     //Object.keys(objectName) method use                  


    //Update data in(server)Api using Async fun. and call fun. where Axios.put property use  , and also in local machine
    const putUpdateReqFunction=async()=>{
        try {
         const res = await PutReqApi(editUpdateData.id, addData )      // fun call where id of curData which we want update or data(new Data in input field which we want replace with old data) pass as a argument            
         console.log(res)                                              //update data in server 
          
         if(res.status===200){
         //in local machine update data
         setJsonData((prev)=>{
          //  console.log(prev)          //o/p - 100 data in object {}
          return prev.map((curElem)=>{
           // return curElem.id === editUpdateData.id ? res.data : curElem;     // it's also work
            return curElem.id === res.data.id ? res.data : curElem;             // jo bhi 100 m se agar curElm ki id , user ki id k equal ho jay-ega, (true hone)si-rf usi ka data update kar na hai(res.data- axios se get data- .data se mil-ta hai) ,(false hone pr ) curElem as a tease rhe 
          });
         });
         setAddData({title:"", body:""});     //empty input field after click edit button
         setEditUpdateData({});            //empty editUpdate state after click edit button   ,so now add button show because editUpdate is empty so isEmpty value is false than Add button show 
        }   
        } catch (error) {
            console.log(error)
        }     
    }
    
    //* Form submission
    const handleFormSubmit=(e)=>{    //e is event object 
        e.preventDefault();
 
        //check in form button value is add or edit so we use this code or we also use useRef hook
        const action = e.nativeEvent.submitter.value;
        
        if(action==="Add"){
        postReqFunction();  // postReq. fun. call
        }
        else if(action === "Edit"){
        putUpdateReqFunction();  //putUpdate Req. fun. call
        }
     }

    return(
        <form onSubmit={handleFormSubmit}>
            <label htmlFor="title">Title: <input type="text" name="title" autoComplete="off" id="title" placeholder="Add Title" value={addData.title} onChange={handleInputChange} /></label>
            <label htmlFor="body">Body: <input type="text" name="body" autoComplete="off" id="body" placeholder="Add Post" value={addData.body} onChange={handleInputChange} /></label>

            <button type="submit" value={isEmpty? "Add": "Edit"}>{isEmpty? "Add" : "Edit"}</button>
        </form>
    )
}
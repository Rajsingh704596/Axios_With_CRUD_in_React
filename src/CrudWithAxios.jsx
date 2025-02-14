import "./CrudWithAxios.css"
import { useEffect, useState } from "react";
import { delReqApi, getReqApi } from "./API/CrudApi";
import Data from "./Data";
import { FormPostData } from "./FormData";

export const CrudWithAxios = () => {
  const  [jsonData, setJsonData ] = useState([]);  //useState hook use to store data from api
  const [editUpdateData,setEditUpdateData] =useState({})      //usestate hook create for store edit data

  //  console.log(getReqApi());        // o/p-    Promise {<pending>}
  
  //todo- Data get from fun (inside function axios get api call)using async await 
  const showData = async () => {
    try {
      const res = await getReqApi();
    //   console.log(res);         //o/p-{data: Array(100), status: 200, statusText: '', headers: AxiosHeaders, config: {…}, …}
       setJsonData(res.data);
      } 
      catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    showData();
  }, []);
 
  //todo- function for delete data         // when we work with api it's return promises, so that's why we use Async await to handle promises
  const handleDelete=async(id)=>{
    try {
      const res= await delReqApi(id);                   //api data delete when delete method call(axios.delete(API/id))
      // console.log(updateData);                                 //now api se data delete ho chukka hai
      //then filter method use 
          if(res.status===200){
               const NewUpdatedDate = jsonData.filter((curData)=>{
                return curData.id !== id;          // curData ki id , user ki delete id se match nhi ho wo sb-hi data return kar tho
               })
               setJsonData(NewUpdatedDate);        //update data store in state
          }
      
    } catch (error) {
      console.log(error);
    }
  }

  //todo- handleEdit fun 
   const handleEditData=(curElem)=>{      //curElem get as a parameter
       setEditUpdateData(curElem);   //jo user n click edit k li ye use editUpdateData state m store kar le
   }

  return (
    <>
      <h1 className="heading">Json Api call using Axios and Perform CRUD Operation </h1>
      <div className="container">
        <section className="form">
           <FormPostData jsonData={jsonData} setJsonData={setJsonData} editUpdateData={editUpdateData} setEditUpdateData={setEditUpdateData}/>  {/* form data ko jsonData m add kar ne k li ye useState pass ki ya gaya hai   */}
        </section>
      <ol>
        {
        jsonData.map((curElem) => {
         return <Data key={curElem.id} curElem={curElem} onDelete={handleDelete} handleEditData={handleEditData}/>
      })}
      </ol>
      </div> 
    </>
  );
};

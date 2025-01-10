// import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { getReq } from "../services/GetServices";

export const AxiosNormalWay = () => {
  const [data, setData] = useState([]); //useState hook define , and initial value is empty array

  // const API = "https:/www.omdbapi.com/?i=tt3896198&apikey=1c12799f&s=titanic&page=1";

  //# axios use with normal promise method (.then.catch method)
  // const getApiData=()=>{
  //     axios.get(API).then((res)=> console.log(res)).catch((error)=>console.log(error))
  // }

  //# axios use inside Async fun (Async await with error Handle try catch method)-
  const getApiData = async () => {
    try {
      //@ normal way to axios
      // const res = await axios.get(API);    //^ using axios get method call Where API pass
      
      //@ better way to call fun where axios get req define 
      const res= await getReq();

      // console.log(res);            //o/p- {data: {…}, status: 200, statusText: '', headers: AxiosHeaders, config: {…}, …}     //^  object data get because automatic JSON transformation feature provide by axios

      // console.log(res.data.Search)   //o/p- (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
      // the main object we want get using object property method

      //^ data store in useState-
      setData(res.data.Search);
    } catch (error) {
      //^ Axios provide better error handling-
      console.log(error); //o/p- AxiosError {message: 'Request failed with status code 401', name: 'AxiosError', code: 'ERR_BAD_REQUEST', config: {…}, request: XMLHttpRequest, …}
      console.error("Error Message:", error.message); //o/p-Error Message: Request failed with status code 401
      console.error("Error Status:", error.response.status); //o/p-Error Status: 401
      console.error("Error Data:", error.response.data); //o/p-Error Data: {Response: 'False', Error: 'No API key provided.'}
    }
  };

  //^ axios use inside useEffect but here we call fun
  useEffect(() => {
    getApiData(); //function call/invoke only one time because of empty array dependency in useEffect hook
  }, []);

  return (
    <>
      <ul>
        {data.map((curElem) => {
          const { Poster, Title, imdbID } = curElem;
          return (
            <li key={imdbID}>
              <figure>
                <img src={Poster} alt={Title} />
              </figure>
              <p>Title: {Title}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

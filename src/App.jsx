//! Axios-  
//# Axios is a "promise-based HTTP library" that helps you easily communicate with servers or APIs over the internet.
//# It allows your website or app to send and receive data from a server like "fetching information, submitting forms, or updating content without reloading the entire page".
//# Axios uses "promises to handle HTTP requests and responses".
//# It is alternative of Fetch API.


import './App.css'
import { CrudWithAxios } from './CrudWithAxios'
// import { AxiosNormalWay } from './Pages/Axios.get'

function App() {
  

  return (
    <>
  
    {/* <AxiosNormalWay/> */}
    <CrudWithAxios/>
    </>
  )
}

export default App


//? Why choose "Axios" over "Fetch" ? 
  //^ Easier syntax and Cleaner code.
  //^ Automatic JSON transformation without extra code.
  //^ Better built-in error handling.
  //^ support for older browser.
 
  
  

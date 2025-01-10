/* eslint-disable react/prop-types */

function Data({curElem,onDelete,handleEditData}) {
    //  console.log(value);         // {userId: 1, id: 1, title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit', body: 'quia et suscipit\nsuscipit recusandae consequuntur …strum rerum est autem sunt rem eveniet architecto'}
    const{body, title, id}=curElem;

  return (
    <>
    <div className="list">
      <div className="glassMorphismEffect">
        <li>
        <p>Title : {title}</p>
        <p>Body : {body}</p>
        <button onClick={()=>handleEditData(curElem)}>Edit</button>   {/*Edit pr click kar-ne pr Function call or curElem pass as a argument which is click by user*/}   
        <button onClick={()=>onDelete(id)}>Delete</button>           {/*id must be pass when data delete */}
        </li>
    </div> 
    </div> 
      
    </>
  )
}

export default Data

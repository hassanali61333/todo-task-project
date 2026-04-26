import React, { useEffect, useState } from 'react';

function Home() {

const [myinput,setmyinput]=useState("")
const [array,setarray]=useState([])
const [editindex,seteditindex]=useState(null)


const editbtn =(idx)=>{
setmyinput(array[idx])
seteditindex(idx)

}
const savedata =()=>{
  if(!myinput) return;
  if(editindex !== null ){
      
     let updated = array.map((itm,idx)=>(
      idx === editindex? myinput: itm
     ))
setarray(updated)
     localStorage.setItem("tasks",JSON.stringify(updated))
    seteditindex(null)
    setmyinput('')
  }
  else{
  let newarray= [...array,myinput]
setarray(newarray)
localStorage.setItem("tasks",JSON.stringify(newarray))
setmyinput("")
  }

}

useEffect(()=>{
   let data=localStorage.getItem("tasks")
   data? setarray(JSON.parse(data)): setarray([])
},[])

const deletebtn =(itemindex)=>{
 let myarray= array.filter((i,idx)=>   idx !== itemindex   )
  setarray(myarray)
  localStorage.setItem( "tasks",  JSON.stringify(myarray))
}



  return (
    <div className="App">
      <h1>My  Todo App</h1>

      <div className="input-container">
        <input type="text" placeholder="Enter a task"   value={myinput} onChange={(e)=> setmyinput(e.target.value)}   />
        <button className="add-btn"  onClick={savedata}>savedata</button>
      </div>
      <ul>

    {
     array.length > 0?
      

     (array.map((item,index)=> (
        <li key={index}>
      {item}    <button onClick={()=> deletebtn(index)}>del</button> 
        <button className="update-btn"  onClick={()=> editbtn(index)}>edit</button>
     </li>
     ))
     ):
     <p>not any work found</p>
    }
      </ul>

    </div>
  );
}

export default Home;

import React, {useState} from "react";


function Prueba(){

  const [value,setValue]=useState("");

  const handleChange=(e:any)=>{
    setValue(e.target.value)  ;
    console.log(value);
  }


  return(
   <>
     <input type="text" value={value} onChange={e=>handleChange(e)}/>
   </>
 )
}
export default Prueba;
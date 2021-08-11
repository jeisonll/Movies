import React, {useEffect, useState} from "react";
import {Modal, ModalHeader,ModalBody,ModalFooter} from "reactstrap"

import {Geder} from "../types/Geders";
interface Props{
  modal:boolean;
  toggle: ()=>void;
  geders:Geder;
  onSucces:(geder:Geder,type:"UPDATE"|"INSERT")=>void;
  title:string;
}

interface Props{
  modal:boolean;
  toggle: ()=>void;
  geders:Geder;
  onSucces:(geder:Geder,type:"UPDATE"|"INSERT")=>void;
  title:string;
}


export  const initialGeder: Geder = {
  name: ""
}

function UpdateOrInsertGederModal({modal,toggle,geders,onSucces,title}:Props){
 const [values,setValues]=useState(initialGeder)




  useEffect(()=>{
    setValues(geders)
  },[])

//   <div className="form-group">
//     <label htmlFor="message-text" className="col-form-label">Name:</label>
//   <input className="form-control" type="text" name="name" value={values.name || ""}
//          required onChange={handleChange}/>
// </div>
  const handleChange=(e:any)=>{
   setValues({...values, [e.target.name]:e.target.value})
  }
  const onsubmit =()=>{
   if (values.id){
     onSucces(values, "UPDATE")
   }else{
     onSucces(values,"INSERT")
   }

  }


  return(
    <>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <form id="formGederInsert" onSubmit={onsubmit}>
            <div className="form-group">
              <label htmlFor="message-text" className="col-form-label">name:</label>
              <input className="form-control" name="name" type="text" value={values.name ||""}
              required onChange={handleChange}/>
            </div>

          </form>

        </ModalBody>
        <ModalFooter> <button
          type="submit"
          form="formGederInsert"
          className="btn btn-primary"
           >Insert</button>
          <button className="btn btn-secondary" onClick={toggle}>Cancel</button>
        </ModalFooter>

      </Modal>
    </>
  )
}
export default UpdateOrInsertGederModal;
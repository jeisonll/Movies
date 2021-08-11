import React, {useEffect, useState} from "react";
import {getGedersservices, postGederServices, putGederServices} from "../Services/GederServices";
import UpdateOrInsertGederModal from "../Modals/UpdateOrInsertGederModal";
import {type} from "os";
import {Geder} from "../types/Geders";



function AdminGenders(){
  const [values,setValues]=useState([]);
  const [geder, setGeder]=useState<any>({})
  const [modal,setModal]=useState(false);
  const toggle=()=>{
    setModal(!modal)
  }

  const getGeders=()=>{
    getGedersservices().then((res:any)=>{
      if (res.success){
        setValues(res.items)
        console.log(values)
      }

    })

  }
  const insertGeders = (geder:Geder, type:"INSERT"|"UPDATE") => {
    switch (type) {
      case "INSERT":
        postGederServices(geder).then((res: any) => {
          if (res.success) {
            getGeders()

          }
        })

        break;
      case "UPDATE":
        putGederServices(geder).then((res: any) => {
          if (res.success) {
            getGeders()

          }
        })
        break;

    }
  }

    useEffect(() => {
      getGeders();
    }, [])

    return (
      <>
        <table className="bg-dark">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
          </tr>
          </thead>
          <tbody>

          {values.map((geder:Geder, i) => (
            <tr key={i}>
              <th scope="row">{i}</th>
              <td>{geder.name}</td>
            </tr>
          ))}


          </tbody>

        </table>
        <button className="btn btn-primary" onClick={toggle} ></button>
        <div>
          <UpdateOrInsertGederModal modal={modal} toggle={toggle} geders={geder} onSucces={insertGeders}
                                    title={geder.id ? "Update movie" : "Insert Movie"}
          />
        </div>
      </>
    )


}
export default AdminGenders;
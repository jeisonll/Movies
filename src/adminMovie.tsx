import React, {useEffect, useState} from "react";
import {getMoviesService} from "./Services/MovieServices";
import {Table} from "reactstrap"
import {FontAwesomeIcon, FontAwesomeIconProps} from "@fortawesome/react-fontawesome";
import {faTrash,faEdit} from "@fortawesome/free-solid-svg-icons";

function AdminMovie(){
  const [movies,setMovies]=useState([])
  const [loading,setLoading]=useState(false)



   useEffect(()=>{
     setLoading(true);
     getMovie();
   },[])



  const getMovie = () => {
    getMoviesService().then((res: any) => {
      if (res.success) {
        setMovies(res.items);
        setLoading(false);
      }
    })

  }
  return(
    <div className="container">
      <div className="mt-4">
        <table className="table table-dark">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Stars</th>
            <th scope="col">Descriptions</th>
            <th scope="col">Actions</th>
          </tr>
          </thead>
          <tbody>

          {
            movies.map((movie:any,i)=>(

            <tr>
              <th scope="row">{i}</th>
              <td>{movie.name}</td>
              <td>{movie.stars}</td>
              <td>{movie.description.slice(0,20)}...</td>
              <td>
                <button className="btn btn-link sm position-absolute text-white" ><FontAwesomeIcon className="text-white " icon={faEdit}
                /></button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn btn-link sm position-absolute text-white"><FontAwesomeIcon className="text-white " icon={faTrash}
                /></button>
              </td>
            </tr>
          ))}

          </tbody>
        </table>
      </div>

    </div>
  )
}
export default AdminMovie;
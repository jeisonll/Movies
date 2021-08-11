import React, {useEffect, useState} from "react";
import {deleteMovieService, getMoviesService, postMovieService, putMoviesService} from "../Services/MovieServices";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import UpdateOrInsertMovieModal, {initialMovie} from "../Modals/UpdateOrInsertMovieModal"
import {Movie} from "../types/Movie";
import DeleteMovieModal from "../Modals/DeleteMovieModal";


function AdminMovie() {
  const [movies, setMovies] = useState([])
  // const [movie, setMovie] = useState<any>(initialMovie)
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  // const [modalInsert, setModalInsert] = useState(false);
  const [movieSelect, setMovieSelect] = useState<Movie>(initialMovie)

  const toggle = () => {
    setModal(!modal);
  }
  const toggleDelete = () => {
    setModalDelete(!modalDelete);
  }
  // const toggleDelete = () => {
  //   setModal(!modalDelete);
  // }
  //
  // const toggleInsert = () => {
  //   setModalInsert(!modalInsert);
  //   setMovie({});
  // }


  useEffect(() => {
    setLoading(true);
    getMovie();
  }, [])

  // const handleChange = (e: any) => {
  //   setMovieSelect({...movieSelect, [e.target.name]: e.target.value});
  //
  // }
  // const handleChangeInsert = (e: any) => {
  //
  //   setMovie({...movie, [e.target.name]: e.target.value})
  // }

  const handleDelete = (e: any) => {
    e.preventDefault()
    deleteMovieService(movieSelect).then((res: any) => {
      if (res.success) {
        toggle();
        getMovie();
      }
    })
  }


  // const handleUpdate = (e: any) => {
  //   e.preventDefault();
  //   putMoviesService(movieSelect).then((res: any) => {
  //     if (res.success) {
  //       toggle();
  //       getMovie();
  //     }
  //   })
  // }
  // const handleInsert = (e: any) => {
  //   e.preventDefault();
  //   postMovieService(movie).then((res: any) => {
  //     if (res.success) {
  //       toggleInsert();
  //       getMovie();
  //     }
  //   })
  // }
  const onDelete = (movie:any) => {
    deleteMovieService(movie).then((res:any)=>{
      if(res.success){
        toggleDelete();
        getMovie();
      }
    })
  }

  //En el onSuccess se manda onSave como callback y dependiendo del tipo que devuelva se guarda o actualiza
  function onSave(movie: Movie, type: "UPDATE" | "INSERT") {
    switch (type) {
      case "UPDATE":
        putMoviesService(movie)
          .then((res: any) => {
            if (res.success) {
              toggle();
              getMovie();
            }
          })
        break;
      case "INSERT":
        postMovieService(movie)
          .then((res: any) => {
            if (res.success) {
              toggle();
              getMovie();
            }
          })
        break;
    }
  }
  //Servicio para extraer las peliculas
  const getMovie = () => {
    getMoviesService().then((res: any) => {
      if (res.success) {
        setMovies(res.items);
        setLoading(false);
      }
    })

  }
  const movieSelection = (movie: any) => {
    setMovieSelect(movie)
    toggle()
  }
  const movieSelectionDelete =(movie:any)=>{
    setMovieSelect(movie)
    toggleDelete()
  }

  return (
    <>
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
              movies.map((movie: any, i) => (

                <tr key={i}>
                  <th scope="row">{i}</th>
                  <td>{movie.name}</td>
                  <td>{movie.stars}</td>
                  <td>{movie.description.slice(0, 20)}...</td>
                  <td>
                    <button
                      className="btn btn-link sm position-absolute text-white"
                      onClick={() => movieSelection(movie)}>
                      <FontAwesomeIcon className="text-white " icon={faEdit}/>
                    </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button className="btn btn-link sm position-absolute text-white"  onClick={() => movieSelectionDelete(movie)}><FontAwesomeIcon
                      className="text-white " icon={faTrash}
                    /></button>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
        <button
          className="btn btn-primary position-absolute text-dark text-center"
          onClick={() => {
            // Cuando quiera insertar reestablezco movieSelect para que no cargue informacion previamente guardada
            toggle();
            setMovieSelect(initialMovie);
          }}>
          Insert
        </button>
      </div>
      <div>
        <UpdateOrInsertMovieModal
          //con la id sabremos si es actualizar o eliminar
          title={movieSelect.id ? "Update movie" : "Insert Movie"}
          toggle={toggle}
          movie={movieSelect}
          modal={modal}
          onSuccess={onSave}
        />
      </div>
      <div>

        <DeleteMovieModal
          modal={modalDelete}
          movie={movieSelect}
          toggle={toggleDelete}
          onSuccess={onDelete}
        />
      </div>
    </>
  )
}

export default AdminMovie;
import React, {Fragment, useEffect, useState} from 'react';
import './App.css';
import {deleteMovie, getMoviesService, postMovieService, updateMovie} from "./Services/MovieServices";
import {Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap"


function App() {
  const [movies, setMovies] = useState([]);
  const [movieLocal, setMovieLocal] = useState<any[]>([])
  const [spinner, setSpinner] = useState(false)
  const [movieSelect, setMovieSelect] = useState({
    name: '',
    description: '',
    year: '',
    stars: '',
    director: ''
  })
  const selectMovie = (type: "delete" | "edit", id?: number) => {
    switch (type) {
      case "delete":
        if (id) {
          deleteMovie(id).then(res => loadingMovie());
        }
        break;
      case "edit":
        updateMovie(movieSelect).then(res => loadingMovie());
        break;
    }


  }

  useEffect(() => {
    setSpinner(true);
    loadingMovie();
    const local = localStorage.getItem("movieFavorite")
    const movie = local ? JSON.parse(local) : [];
    setMovieLocal(movie);
    setSpinner(false);
  }, []);

  const addMovieLocal = (movieData: any) => {
    const movieFavoriteExist = movieLocal.find((movie: any) => movie.id === movieData.id);
    if (movieFavoriteExist) {
      const newMovie: any[] = Object.assign([], movieLocal);
      setMovieLocal(newMovie.filter((movie: any) => movieData.id !== movie.id))
    } else {
      const newMovie: any[] = Object.assign([], movieLocal);
      newMovie.push(movieData);
      setMovieLocal(newMovie);
    }

    localStorage.setItem("movieFavorite", JSON.stringify(movieLocal));
  }
  console.log(movieLocal)

  const loadingMovie = () => {
    getMoviesService().then((res: any) => {
      if (res.success) {
        setMovies(res.items);
        // setUpdateMovie(false);
      }
    })
    console.log(movies)
  }

  function save_localStorage() {
    var favoritos = [];
    localStorage.setItem("movieFavorite", JSON.stringify(movieSelect));

  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-10">
            <div className="row">
              {movies.map((movie: any, i) => (
                <div className="card bg-transparent border-0 mt-4" style={{width: "18rem"}}>
                  <img className="card-img-top border-1 rounded position-relative" src={movie.image}
                       alt="Card image cap"/>
                  <h3 className="rounded-circle border-4 bg-primary text-white position-absolute">{movie.year}</h3>
                  <div className="card-body">
                    <p className="card-text text-white">{movie.name}</p>
                    <button className="btn btn-primary btn-sm" onClick={() => {
                      addMovieLocal(movie)
                    }}>favorite
                      {movieLocal.find((m: any) => m.id === movie.id) ? "+" : "-"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-2">
            <ul className="list-group list-group-flush  " style={{width: "8rem"}}>

              {movieLocal.map((movie: any, i) => (
                <li className="list-group-item text-white bg-transparent">{movie.name}
                  <img className="card-img-top border-1 rounded position-relative" src={movie.image}
                       alt="Card image cap"/>

                </li>

              ))}
            </ul>
          </div>
        </div>

      </div>

    </>
  );
}

export default App;

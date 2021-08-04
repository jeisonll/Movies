import React, {Fragment, useEffect, useState} from 'react';
import './App.css';
import {getMoviesService} from "./Services/MovieServices";
import {Spinner} from "reactstrap"


function App() {
  const [movies, setMovies] = useState([]);
  const [movieLocal, setMovieLocal] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [movieSelect, setMovieSelect] = useState({
    name: '',
    description: '',
    year: '',
    stars: '',
    director: ''
  })


  useEffect(() => {
    setLoading(true);
    const local = localStorage.getItem("movieFavorite")
    const movie = local ? JSON.parse(local) : [];
    setMovieLocal(movie);
    loadingMovie();
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
        setLoading(false);
        // setUpdateMovie(false);
      }
    })

  }


  return (

    <>
      {loading ? <Spinner color="light" /> :
        <div className="container">

          <div className="row">
            <div className="col-10">

              <div className="row">
                {movies.map((movie: any, i) => (
                  <div className="card bg-transparent border-0 mt-4" style={{width: "18rem"}}>
                    <img className="card-img-top border-1 rounded position-relative" src={movie.image}
                         alt="Card image cap"/>
                    <h5 className="rounded-circle border-4 bg-primary text-white position-absolute p-2" style={{bottom:"100px" ,right:"20px"}}>{movie.year}</h5>
                    <div className="card-body">
                      <p className="card-text text-white text-center">{movie.name}</p>
                      <button className="btn btn-primary btn-sm" onClick={() => {
                        addMovieLocal(movie)
                      }}>favorito
                        {movieLocal.find((m: any) => m.id === movie.id) ? "+" : "-"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-2">
              <ul className="list-group list-group-flush  " style={{width: "8rem"}}>
                <li className="list-group-item text-white bg-transparent"><h6>Lista de Favoritos</h6></li>
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
      }
    </>
  );
}

export default App;

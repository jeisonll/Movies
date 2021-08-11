import React, {useEffect, useState} from 'react';
import './App.css';
import {getMoviesService} from "./Services/MovieServices";
import {listFavorite} from "./Components/DetailMovie"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHeart, faSpinner} from '@fortawesome/free-solid-svg-icons'
import {useHistory} from "react-router-dom";


function App() {
  const [movies, setMovies] = useState([]);
  const [movieLocal, setMovieLocal] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  // const [movieSelect, setMovieSelect] = useState({
  //   name: '',
  //   description: '',
  //   year: '',
  //   stars: '',
  //   director: ''
  // })


  useEffect(() => {
    setLoading(true);
    const local = localStorage.getItem("movieFavorite")
    const movie = local ? JSON.parse(local) : [];
    setMovieLocal(movie);
    loadingMovie();
  }, []);


  const loadingMovie = () => {
    getMoviesService().then((res: any) => {
      if (res.success) {
        setMovies(res.items);
        setLoading(false);


        // setUpdateMovie(false);
      }
    })

  }
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


  let history = useHistory();

  function handleClick(id: string) {


    history.push("/details/" + id);
  }


  return (
//  <FontAwesomeIcon icon={faSpinner} className=" light"/>
    <>

      {loading ?
        <div className="text-center"><FontAwesomeIcon spin className="text-white" size="4x" icon={faSpinner}/></div> :
        <div className="container">

          <div className="row">
            <div className="col-10">

              <div className="row">
                {movies.map((movie: any, i) => (
                  <div key={i} className="card bg-transparent border-0 mt-4" style={{width: "18rem"}}>
                    <img className="card-img-top border-1 rounded position-relative" src={movie.image}
                         onClick={() => handleClick(movie.id)}/>
                    <h5 className="rounded-circle border-4 bg-primary text-white position-absolute p-2"
                        style={{bottom: "100px", right: "20px"}}>{movie.year}</h5>


                    <div className="card-body">
                      <p className="card-text text-white text-center">{movie.name}
                        <button className="btn btn-link btn-sm position-absolute" style={{right: "20px"}}
                                onClick={() => {
                                  addMovieLocal(movie)
                                }}>
                          {!movieLocal.find((m: any) => m.id === movie.id) ?
                            <FontAwesomeIcon className="text-white " icon={faHeart}
                            /> : <FontAwesomeIcon className="text-danger  " icon={faHeart}
                            />}
                        </button>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-2">
              {listFavorite(movieLocal)}
            </div>
          </div>

        </div>
      }
    </>
  );
}

export default App;

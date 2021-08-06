import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'
import {getByIdService, getMoviesService} from "../Services/MovieServices"
import {useParams} from "react-router-dom";

//
//
//
// import  from "../App"
export const listFavorite = (movieLocal: any) => (
  <div className="border-2 rounded-2 bg-dark m-0 justify-content-center d-flex">
  <ul className="list-group list-group-flush text-center " style={{width: "8rem"}}>
    <li className="list-group-item text-white bg-transparent"><h6>Lista de Favoritos</h6></li>
    {movieLocal.map((movie: any, i: any) => (
      <li key={i} className="list-group-item text-white bg-transparent">{movie.name}
        <img className="card-img-top border-1 rounded position-relative" src={movie.image}
             alt="Card image cap"/>
      </li>

    ))}
  </ul>
  </div>
)


function DetailMovie() {

  const [movie, setMovie] = useState([])
  const [movieLocal, setMovieLocal] = useState<any>([])
  const [loading, setLoading] = useState(false);
  let {id} = useParams<any>();
  const [movieSelect, setMovieSelect] = useState({
    name: '',
    description: '',
    year: '',
    stars: '',
    director: '',
    image: ''
  })



  useEffect(() => {
    setLoading(true)
    ListMovieDetails(id);
    setMovieLocal(id);
    const local = localStorage.getItem("movieFavorite")
    const movie = local ? JSON.parse(local) : [];
    setMovieLocal(movie);
  }, [id])

  const ListMovieDetails = (movieId:string) => {
    getByIdService(movieId).then((res: any) => {
      if (res.success) {
        setMovieSelect(res.item)
        setLoading(false);

      }else {console.log(id)}
    })

  }

  function getStars(stars: number) {
    const s: any[] = [];
    for (let i = 0; i < stars; i++) {
      s.push(<FontAwesomeIcon color={"orange"} icon={faStar}/>);
    }
    return s;
  }

  useEffect(() => {

  }, [])

  return (
    <>

      <div className="container">
        <div className="row">
          <div className="col-10">

              <div >
                <div className="text-center text-white">
                  <h1>{movieSelect.name}</h1>
                  <img src={movieSelect.image} alt="image movie detail"/>

                </div>
                <div>
                  <h3 className="text-center">{getStars(parseInt(movieSelect.stars) )}</h3>
                  <p className="text-white mt-2">{movieSelect.description}</p>
                </div>
              </div>

          </div>
          <div className="col-2 mt-2">

              {listFavorite(movieLocal)}


          </div>
        </div>


      </div>
    </>
  )
}

export default DetailMovie;
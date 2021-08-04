import {deleteReq, get, post, put} from "../Network";


export function getMoviesService() {
  return get("/movies");
}

export function postMovieService (movie: any) {
  return post("/movies", movie)
}

export function updateMovie(movie: any) {
  return put("/movies", movie);
}

export function deleteMovie(id: number) {
  return deleteReq("/movie/" + id)
}
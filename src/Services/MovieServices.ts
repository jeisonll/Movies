import {get, post, put, deleteRequest} from "../Network";


export function getMoviesService() {
  return get("/movies");
}

export function getByIdService(movie: string) {
  return post("/movie/" + movie)
}

export function putMoviesService(movie: any) {
  return put("/movies", movie);

}
export function postMovieService(movie: any) {
  return post("/movies", movie);
}
export function deleteMovieService(movie: any) {
  return deleteRequest("/movie/"+ movie);
}



import {get} from "../Network";


export function getMoviesService() {
  return get("/movies");
}
export function getByIdService(movie:string){
  return get("/movie/"+movie)
}


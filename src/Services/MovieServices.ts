import {get,post} from "../Network";


export function getMoviesService() {
  return get("/movies");
}
export function getByIdService(movie:string){
  return get("/movie/"+movie)
}
export function posMoviesService(movie:any) {
  return post("/movies",movie);
}


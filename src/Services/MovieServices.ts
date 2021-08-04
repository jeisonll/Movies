import { get} from "../Network";


export function getMoviesService() {
  return get("/movies");
}


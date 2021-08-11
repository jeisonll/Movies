import {get, post, put} from "../Network";
import {Geder} from "../types/Geders";


export function getGedersservices(){
  return get("/genres");
}
export function postGederServices(geder:Geder){
  return post("/genres",geder);
}
export function putGederServices(geder:Geder){
  return put("/genres"+ geder);
}

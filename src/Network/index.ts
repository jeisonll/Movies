import axios from "axios";

const http = axios.create({
  baseURL: 'https://api-movies-free.herokuapp.com/api/v2'
})


http.interceptors.response.use((res => {
  return res.data;
}))
export const get = (url: string, params?: any) => (http.get(url, {params}))

export const post = (url: string, params: any):any=> {
  return http.post(url, params);
}
export const put = (url: string, params: any) => {
  return http.put(url, params);
}
export const deleteReq = (url: string, params?: any) => {
  return http.delete(url, {params});
}

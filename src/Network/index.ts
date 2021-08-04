import axios from "axios";

const http = axios.create({
  baseURL: 'https://api-movies-free.herokuapp.com/api/v2'
})


http.interceptors.response.use((res => {
  return res.data;
}))
export const get = (url: string, params?: any) => (http.get(url, {params}))



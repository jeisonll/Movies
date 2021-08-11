//Tipado de movie se coloca export para poder ver el tipado de movie en otras partes
export interface Movie {
  id?: number
  name: string;
  description: string;
  director: string;
  stars: number;
  image: string;
  year: number;
}
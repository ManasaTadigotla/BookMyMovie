import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../Model/movie';
import { AppSettings } from '../app-settings';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  //private apiUrl = "http://localhost:8188/";
  constructor(
    private http:HttpClient
  ) { }

  getMovies():Observable<any>
  {
    return this.http.get<any>(AppSettings.baseUrl+"movies");
  }
getMoviesByLocation(locationId:any)
{
  return this.http.get<any>(AppSettings.baseUrl+"moviesbylocation/"+locationId);
}
 
  getMovieById(id:number):Observable<Movie>
  {
    return this.http.get<Movie>(AppSettings.baseUrl+"movies/"+id);
  }

  getMoviesByMovie(movieId:number)
  {
    return this.http.get<Movie>(AppSettings.baseUrl+movieId);

  }

  addNewMovie(movie:Movie):Observable<Movie>
  {
    return this.http.post<Movie>(AppSettings.baseUrl+"movie/add",movie);
  }

  updateMovieName(movie:Movie):Observable<any>
  {
    return this.http.put(AppSettings.baseUrl+"movie/update",movie);
  }

  deleteMovie(id:number):Observable<any>
  {
    return this.http.delete(AppSettings.baseUrl+"movie/delete/"+id);
  }

  getShowByMovieID(id:number):Observable<any[]>{
    return this.http.get<any>(`${AppSettings.baseUrl}+"movies/"+${id}`);
  }
  
  getTheatresByMovieAndLocation(movieId:number,locationId:number):Observable<any>
  {
    return this.http.get<any>(AppSettings.baseUrl+"theatres/"+locationId+"/"+movieId);
   //return this.http.get<any>("http://localhost:8188/theatres/1/1");
  }

  //Languages
  getAllLanguages():Observable<any>
  {
    return this.http.get<any>(AppSettings.baseUrl+"languages");
  }


}

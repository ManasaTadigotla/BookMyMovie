import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Genre } from '../genre';
import { AppSettings } from '../app-settings';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  constructor(
    private http:HttpClient
  ) { }

  getGenres():Observable<any>
  {
    return this.http.get<any>(AppSettings.baseUrl+"genres");
  }

  getGenreById(id:number):Observable<Genre>
  {
    return this.http.get<Genre>(AppSettings.baseUrl+"genre/"+id);

  }

  getMoviesByGenre(genreId:number)
  {
    return this.http.get<Genre>(AppSettings.baseUrl+genreId);

  }

  addNewGenre(genre:Genre):Observable<Genre>
  {
    return this.http.post<Genre>(AppSettings.baseUrl+"genre/add",genre);
  }

  updateGenreName(genre:Genre):Observable<any>
  {
    return this.http.put(AppSettings.baseUrl+"genre/update",genre);
  }

  deleteGenre(id:number):Observable<any>
  {
    return this.http.delete(AppSettings.baseUrl+"genre/delete/"+id);
  }

}

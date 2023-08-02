import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Theatre } from '../Model/theatre';
import { AppSettings } from '../app-settings';
import { Seat } from '../Model/seat';
import { ShowTimes } from '../Model/show-times';

@Injectable({
  providedIn: 'root'
})
export class TheatreService {

  constructor(private http: HttpClient) { }
  getTheatres():Observable<any>
  {
    return this.http.get<any>(AppSettings.baseUrl+"theatres");
  }

  getMovieById(id:number):Observable<Theatre>
  {
    return this.http.get<Theatre>(AppSettings.baseUrl+"theatre/"+id);
  }

  getTheatresByTheatre(theatreId:number)
  {
    return this.http.get<Theatre>(AppSettings.baseUrl+"theatre/"+theatreId);

  }
  getShows(theatreId:any):Observable<any>
  {
    return this.http.get<any>(AppSettings.baseUrl+"shows/"+theatreId);
    //return this.http.get<any>("http://localhost:8188/shows/1");
  }
  getSeatsInfo(theatreId:number):Observable<Seat>
  {
    return this.http.get<Seat>(AppSettings.baseUrl+"theatre/seats/"+theatreId);
  }
  getPriceOfTicket(type:string):number
  {
    if(type=="type1")
    {
      return 200;
    }
    else if(type=="type2")
    {
      return 150;
    }
    else
    {
      return 100;
    }

    //return this.http.get<any>(AppSettings.baseUrl+"ticket/price"+type);
  }

  addNewTheatre(theatre:Theatre):Observable<Theatre>
  {
    return this.http.post<Theatre>(AppSettings.baseUrl+"theatre/add",theatre);
  }

  mapTheatreToLocation(theatre:Theatre,locationId:number):Observable<Theatre>
  {
    return this.http.post<Theatre>(AppSettings.baseUrl+"location/addtheatre/"+locationId,theatre);
  }

  updateTheatreName(theatre:Theatre):Observable<any>
  {
    return this.http.put(AppSettings.baseUrl+"theatre/update",theatre);
  }

  deleteTheatre(id:number):Observable<any>
  {
    return this.http.delete(AppSettings.baseUrl+"theatre/delete/"+id);
  }

}

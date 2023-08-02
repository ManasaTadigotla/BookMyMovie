import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from '../app-settings';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  constructor(private http: HttpClient) { }

  getShowTimesByTheatre(theatreId:any)
  {
    //this.http.
  }
  getSeatInfoByShow(theatreId:any,showId:any):Observable<any>
  {
    //return this.http.get<any>(AppSettings.baseUrl + "seats/" + theatreId + "/show/" + showId);
    return this.http.get<any>("http://localhost:8188/seats/"+theatreId+"/show/"+showId);
    
  }
}

import { Component } from '@angular/core';
import { LocationService } from 'src/app/service/location.service';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent {
  math = Math;
  locations:any;
  locationSelected:any;

  
  name:string="";
  key:string = "name"
  

  constructor(private movieService: MovieService,
    private locationService: LocationService
    ) { }

  MoviesDisplay: any = [];
  ngOnInit(): void {
    
    this.loadLocations();  
    this.loadMovies();
    
  }
  
  loadLocations()
  {
    this.locationService.getLocations().subscribe(loc=>{
     console.log(loc);
      this.locations=loc;  
      if(this.locationSelected==undefined)
    {
      //alert(this.locationSelected)
      //alert(this.locations);
      this.locationSelected=loc[0].locId;
      console.log("loc"+this.locationSelected);
      //this.locationSelected=this.locations[0].locId;
      sessionStorage.setItem("location",this.locationSelected.toString());
    }
      
    })
  }
  onLocationSelect(locId:any)
  {    
    //alert(locId);
    
    console.log(locId);
    this.locationSelected=locId;
    sessionStorage.setItem("location",locId.toString());
    this.loadMovies();
    
  }

  loadMovies() {
    
    if(this.locationSelected==undefined)
    {
     // alert(this.locationSelected);
      this.movieService.getMovies().subscribe((movieResult) => {
        console.log(movieResult);
        this.MoviesDisplay = movieResult;
      });
    }
    else{      
      this.movieService.getMoviesByLocation(this.locationSelected).subscribe((movieResult) => {
        console.log(movieResult);
        this.MoviesDisplay = movieResult;
      });
   }
   
  }
 

  convertMinuteToHour(minute:number){
    var hours = this.math.floor(minute/60);
    var minutes = minute % 60;
    var duration = hours+" H : " +minutes + "M";
    return duration;
  }

  SearchMovie()
  {
    if(this.name=="")
    {
      this.loadMovies();
    }
    else
    {
      console.log(this.name);
      this.MoviesDisplay = this.MoviesDisplay.filter(genreobj=>{
        return genreobj.name.toLocaleLowerCase().match(this.name);
      });
    }
  }


}

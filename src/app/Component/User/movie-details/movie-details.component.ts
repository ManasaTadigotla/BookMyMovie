import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/Model/movie';
import { ShowTimes } from 'src/app/Model/show-times';
import { MovieService } from 'src/app/service/movie.service';
import { TheatreService } from 'src/app/service/theatre.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movieId:number;
  locationId:number;
  theatres:any;
  showTimes:any; 
  seats:number;
  movieName:string;
  noOfTickets:number;

  constructor(private movieService: MovieService,
    private theatreServ:TheatreService,
    private route:Router,
    private aroute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.aroute.params.subscribe(params=> this.movieId = params['movieID']);
    this.aroute.params.subscribe(params=> this.locationId = params['locationId']);
    console.log("movie"+this.movieId);

    console.log(this.locationId);
    this.loadTheatres();
  }

  GoToMovieHall(theatreId:any,showId:any)
  {
    sessionStorage.setItem("showId",showId);
    this.route.navigateByUrl("/moviehall/"+theatreId+"/show/"+showId);
  }
  loadTheatres()
  {
      this.movieService.getTheatresByMovieAndLocation(this.movieId,this.locationId).subscribe(res=>{
        //console.log(res);
        this.theatres=res;
       // console.log(res[0].shows);
        this.movieService.getMovieById(this.movieId).subscribe(movie=>
          {
           // this.showTimes=this.getShows()
            console.log(movie);
            this.movieName=movie.name;
            sessionStorage.setItem("moviename",movie.name);
          })
          this.showTimes= this.getShows(1);
        //console.log(this.theatres[2].showTimings);
        //sessionStorage.setItem()
        
      });
    
  }

  getShows(theatreId:any)
  {
    this.theatreServ.getShows(theatreId).subscribe(shows=>{
      console.log(shows);
      this.showTimes=shows;
    })
  }
  redirectToMovieHall()
  {

  }

}

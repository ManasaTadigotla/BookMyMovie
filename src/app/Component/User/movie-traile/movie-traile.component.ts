import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-movie-traile',
  templateUrl: './movie-traile.component.html',
  styleUrls: ['./movie-traile.component.css']
})
export class MovieTraileComponent implements OnInit{

  movie:any;
  movieId:any;
  previousUrl:string;

  constructor(private movieServ:MovieService,
    private aroute:ActivatedRoute,
    private route:Router){}
  ngOnInit(): void {
    this.movieId= this.aroute.snapshot.params["movieId"];
    this.movieServ.getMovieById(this.movieId).subscribe(res=>{
      this.movie=res;
      console.log(this.movie);
    })

    console.log(this.route.url);
    this.previousUrl=this.route.url;
    
    
  }


}

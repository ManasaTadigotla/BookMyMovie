import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/Model/movie';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movieInfo: any;
  p:number=0;
  name:string="";
  key:string = "name";
  reverse:boolean=false;
  oldMovieName!:string;
  enableEdit = false;
  enableEditIndex = null;
  isAddClicked:boolean=false;
  newMovieName!:string;
  

  constructor(private movieServ:MovieService,
    private router: Router){}

  ngOnInit(): void {
    this.viewAll();
  }

  
  viewAll()
  {
    this.movieServ.getMovies().subscribe(data=>{
      console.log("movies are"+data);
      this.movieInfo = data;
      
    });
  }
 
  modifyMovie(id:number,i:number)
  {
    console.log(i);
  }


  Sorting(key:any)
  {
    this.key = key;
    this.reverse= !this.reverse;
  }

  SearchMovie()
  {
    if(this.name=="")
    {
      this.viewAll();
    }
    else
    {
      console.log(this.name);
      this.movieInfo = this.movieInfo.filter(genreobj=>{
        return genreobj.name.toLocaleLowerCase().match(this.name);
      });
    }
  }

  enableEditMethod(e:any, i:any,movie:Movie) {
    this.enableEdit = true;
    this.enableEditIndex = i;

    console.log(i, e);
  }

  cancelEdit()
  {
    this.viewAll();
    this.enableEdit=false;
    console.log(this.oldMovieName);
    //genre.name=this.oldGenreName;
  }
  saveMovie(movie:Movie)
  {
    this.movieServ.updateMovieName(movie).subscribe(data=>{
      console.log(data);

      this.enableEdit=false;
    } );
  }

  deleteMovie(id:number)
  {
    this.movieServ.deleteMovie(id).subscribe(data=>{
      console.log(data);
      this.enableEdit=false;
      this.viewAll();
    });
  }

  addNewMovie()
  {
    let movie:Movie=new Movie();
    movie.name=this.newMovieName;
    console.log(movie);
    this.movieServ.addNewMovie(movie).subscribe(data=>{
      console.log(data);
      alert("New movie is added successfully");
      this.viewAll();
    })

  }

}

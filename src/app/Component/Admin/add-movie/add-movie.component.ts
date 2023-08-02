import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/service/location.service';
import { MovieService } from 'src/app/service/movie.service';
import { TheatreService } from 'src/app/service/theatre.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent  implements OnInit {

  movieDetails: any;
  theatreDetails:any;
  todayDate:Date=new Date();
  languages:any;
  //theatreForm!: FormGroup;

  movieForm = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15)
      ]),
      imageLink:new FormControl('', [
        Validators.required,
        //Validators.minLength(15)       
      ]),
      description:new FormControl('', [
        Validators.required,
        Validators.minLength(15)       
      ]),
      releaseDate: new FormControl('', [
        Validators.required,       
        Validators.maxLength(15)
      ]),
      duration: new FormControl('', [
        Validators.required      
       
      ]),
      
      //movieLanguages: new FormControl('', [
        //Validators.required,
        //Validators.minLength(1),
      //]),
      hero: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10)
      ]),
      heroine: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      director: new FormControl('',[Validators.required])

     
    });

  constructor(private movieServ: MovieService,
     private router:Router
     
    ) { }

  ngOnInit(): void {
   this.todayDate=new Date();
   //this.todayDate this.todayDate|Date:'dd/MM/yyyy';
   console.log(this.todayDate);
  this.languages=[{'id':"1","name":"Telugu"},
  {'id':"2","name":"Hindi"},
  {'id':"3","name":"English"},
  {'id':"4","name":"Kannada"}]
  }

  submitMovieForm(movieForm: FormGroup) {
    this.movieDetails = movieForm.value;
    console.log(this.movieDetails);
    //this.movieDetails.movieLanguages.array.forEach(element => {
      
    //});
    
    this.movieServ.addNewMovie(movieForm.value).subscribe(res => {
      console.log(res);
      alert("Movie is added successfully");   
      this.router.navigateByUrl("/viewallmovies");
    })
  
  }
 



}

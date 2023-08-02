import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { ViewAllMoviesComponent } from './Component/Admin/view-all-movies/view-all-movies.component';
import { RegistrationComponent } from './Component/registration/registration.component';
import { GenreComponent } from './Component/Admin/genre/genre.component';
import { TheatreComponent } from './Component/Admin/theatre/theatre.component';
import { MovieComponent } from './Component/Admin/movie/movie.component';
import { AddMovieComponent } from './Component/Admin/add-movie/add-movie.component';
//import { UserHomeComponent } from './Component/User/user-home/user-home.component';
import { MovieDetailsComponent } from './Component/User/movie-details/movie-details.component';
import { MoviehallComponent } from './Component/User/moviehall/moviehall.component';
//import { SampletestComponent } from './component/sampletest/sampletest.component';
import { AddSeatsComponent } from './component/User/add-seats/add-seats.component';
import { UserHomeComponent } from './Component/User/user-home/user-home.component';
import { ConfirmationComponent } from './Component/User/confirmation/confirmation.component';
import { LoginComponent } from './Component/login/login.component';
import { MovieTraileComponent } from './Component/User/movie-traile/movie-traile.component';



const routes: Routes = [   
  {path:"",component:UserHomeComponent},
  {path:"login",component:LoginComponent},
  {path:"userhome",component:UserHomeComponent},
  {path:"genre",component:GenreComponent},
  {path:"register",component:RegistrationComponent},
  {path:"theatre",component:TheatreComponent},
  {path:"viewallmovies",component:MovieComponent},

  {path:"addmovie",component:AddMovieComponent},
  {path:"movieinfo/:movieId",component:MovieTraileComponent},
  {path: 'movie/:movieID/location/:locationId',component:MovieDetailsComponent},
  {path: 'moviehall/:theatreId/show/:showId',component:MoviehallComponent},
  {path: 'confirmation',component:ConfirmationComponent}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

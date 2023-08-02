import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { CookieModule } from 'ngx-cookie';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './Component/login/login.component';
import { RegistrationComponent } from './Component/registration/registration.component';
import { GenreComponent } from './Component/Admin/genre/genre.component';
import { TheatreComponent } from './Component/Admin/theatre/theatre.component';
//import { ViewAllMoviesComponent } from './Component/Admin/view-all-movies/view-all-movies.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MovieComponent } from './Component/Admin/movie/movie.component';
import { AddMovieComponent } from './Component/Admin/add-movie/add-movie.component';
//import { HomeComponent } from './User/home/home.component';
import { UserHomeComponent } from './Component/User/user-home/user-home.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MovieDetailsComponent } from './Component/User/movie-details/movie-details.component';
import { MoviehallComponent } from './Component/User/moviehall/moviehall.component';

//import { SampletestComponent } from './component/sampletest/sampletest.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddSeatsComponent } from './component/User/add-seats/add-seats.component';
import { DummySeatsComponent } from './component/User/dummy-seats/dummy-seats.component';
import { ConfirmationComponent } from './Component/User/confirmation/confirmation.component';
import { SuccessComponent } from './Component/User/success/success.component';
import { MovieTraileComponent } from './Component/User/movie-traile/movie-traile.component';
//import { SampleComponent } from './component/sample/sample.component';
//import { ShowTimesComponent } from './Model/show-times/show-times.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    GenreComponent,
    TheatreComponent,    
    MovieComponent,
     AddMovieComponent, 
     UserHomeComponent, MovieDetailsComponent, MoviehallComponent, AddSeatsComponent, DummySeatsComponent, ConfirmationComponent, SuccessComponent, MovieTraileComponent
  ],
  imports: [
    BrowserModule,
    
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    NgbModule,RouterModule, BrowserAnimationsModule, FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

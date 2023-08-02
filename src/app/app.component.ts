import { Component, OnInit } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { LocationService } from './service/location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BookMyMovie';
  isNavbarVisiableUser:boolean=true;
  isNavbarVisiableAdmin:boolean=true;
  
  //isNavbarVisiableAdmin:boolean=false;
  //isNavbarVisiableUser:boolean=false;
  isLoggedIn:boolean=false;
  isNotLoggedIn:boolean=!this.isLoggedIn;
  locations:any;
  locationSelected:any;  

  constructor(private router:Router,
    private locationService:LocationService){}
  ngOnInit(): void {
    //this.loadLocations();
    //alert(this.locationSelected);
    //this.locationSelected=
  }
  ngDoCheck()
  {
      let currenturl = this.router.url; // it will give us, component link text which present in Address bar.
      //console.log(currenturl);
      if(sessionStorage.getItem("user")!=null)
      {
        this.isLoggedIn=true;
        this.isNotLoggedIn=false;
      }

      if(currenturl=="/login"  || currenturl=="/register" )
      {
        this.isNavbarVisiableAdmin = false;
        this.isNavbarVisiableUser = false;
      }
      else  if(currenturl=="/admin" || currenturl=="/genre" || currenturl=="/addmovie"||currenturl=="/theatre" ||currenturl=="/viewallmovies")
      {
        this.isNavbarVisiableAdmin = true;
        this.isNavbarVisiableUser = false;
      }
      else  
      {
        this.isNavbarVisiableAdmin = false;
        this.isNavbarVisiableUser = true;
        
      }
      
        
  }
  loadLocations()
  {
    this.locationService.getLocations().subscribe(loc=>{
     console.log(loc[0]);
      this.locations=loc;
      if(this.locationSelected==undefined)
      {    
        this.locationSelected=loc[0].locId;
        alert(this.locationSelected);
      }
      //alert(this.locationSelected);
        
    })
  }
  
  onLocationSelect(locId:any)
  {   /* 
    alert(this.locationSelected);
    
    console.log(locId);
    this.locationSelected=locId;
    sessionStorage.setItem("location",locId.toString());
    */
  }


  updateStatus()
  {
    this.router.navigateByUrl(".address");
  }
}

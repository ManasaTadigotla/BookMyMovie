import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocationService } from 'src/app/service/location.service';
import { TheatreService } from 'src/app/service/theatre.service';

@Component({
  selector: 'app-theatre',
  templateUrl: './theatre.component.html',
  styleUrls: ['./theatre.component.css']
})
export class TheatreComponent implements OnInit {

  theatreDetails: any;
  locationDetails:any;
  
  //theatreForm!: FormGroup;

  theatreForm = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15)
      ]),
      contact: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      theatreLocationId: new FormControl([Validators.required]),

      address: new FormGroup({
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(5)          
        ]),
        city: new FormControl('', Validators.required),
        pincode: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6)
        ]),
        landmark: new FormControl('')
      })
    });

  constructor(private theatreServ: TheatreService,
     private locationServ:LocationService
    ) { }

  ngOnInit(): void {
    this.locationServ.getLocations().subscribe(loc=>{
      console.log(loc);
      this.locationDetails=loc;      
    });
  }

  submitTheatreForm(theatreForm: FormGroup) {
    this.theatreDetails = theatreForm.value;

    this.theatreServ.mapTheatreToLocation(theatreForm.value,theatreForm.controls['theatreLocationId'].value).subscribe(res => {
      console.log(res);
      alert("Theatre is added successfulyy");     
    })
  
  }
 

}

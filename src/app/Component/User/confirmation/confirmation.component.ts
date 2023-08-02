import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TheatreService } from 'src/app/service/theatre.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  selectedSeatNumbers:string;
  theatreId:number;
  theatre:any;
  totalAmount:any;
  seatsArray:any;
  movieName:string;

  //totalAmount!:number;
  paymentMethods:any;
  isPaid:boolean=false;
  paymentpage:boolean=true;
  

  constructor(private aroute:ActivatedRoute,
    private theatreServ:TheatreService,
   ){}
  
  ngOnInit(): void {  

    this.selectedSeatNumbers=sessionStorage.getItem("selectedSeats");
    // this.seatsArray=JSON.parse(sessionStorage.getItem("seats"));
    this.movieName=sessionStorage.getItem("moviename");
    alert(this.movieName);
    //console.log("session storage object"+this.seatsArray);
    //alert("session storage object"+this.seatsArray);
    this.theatreId=parseInt(sessionStorage.getItem("theatre"));
    console.log(this.theatreId);
    this.totalAmount=sessionStorage.getItem("totalAmount");
    this.theatreServ.getTheatresByTheatre(this.theatreId).subscribe(res=>{
      this.theatre=res;
      console.log(this.theatre);console.log(res);
    })

    //this.totalAmount= this.aroute.snapshot.params['amount'];
    this.paymentMethods=["debit card","credit card","netbanking","Cod"];

  }
  getSeatsDetails()
  {
    this.seatsArray= this.selectedSeatNumbers.split(',');
    console.log(this.seatsArray);
    

  }
  gotoConfirmation()
  {
    this.isPaid=true;
    this.paymentpage=false;
    
  }

  

}

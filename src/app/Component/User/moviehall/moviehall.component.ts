import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBooking } from 'src/app/Model/ibooking';
import { ICinemahall } from 'src/app/Model/icinemahall';
import { IShow } from 'src/app/Model/ishow';
import { IShowSeat } from 'src/app/Model/ishow-seat';
import { Movie } from 'src/app/Model/movie';
import { Seat } from 'src/app/Model/seat';
import { Seats } from 'src/app/Model/seats';
import { User } from 'src/app/Model/user';
import { MovieService } from 'src/app/service/movie.service';
import { TheatreService } from 'src/app/service/theatre.service';
import { UserService } from 'src/app/service/user.service';
import { faSquareDribbble } from '@fortawesome/free-brands-svg-icons';
import { faSquareFull } from '@fortawesome/free-regular-svg-icons';
import { faCircle, faFilm, faSquare } from '@fortawesome/free-solid-svg-icons';
import { count, findIndex } from 'rxjs';
import { ShowService } from 'src/app/service/show.service';


@Component({
  selector: 'app-moviehall',
  templateUrl: './moviehall.component.html',
  styleUrls: ['./moviehall.component.css']
})
export class MoviehallComponent implements OnInit{
  //theatreServ
theatreId:number;
movieId:any;
filmIcon=faFilm;
circle=faSquareFull;
square=faSquare;
selectedSeats:any[]=[];
noOfSeats:number=1;
seatNumbers:string=null;
seatsArray: any;
showId:any;
totalAmount:number=0;

  seatType: String;
  rowName: String;
 
  seatscount: number[] = [];
  
  seat: Seats;
  isequaltocolumns: boolean = false;
  customSeatId: String;
  showTimes:any;
  tickets:any;

  constructor(private theatreServ:TheatreService,
    private aroute: ActivatedRoute,
    private movieServ:MovieService,
    private showServ:ShowService,
    
   // private cookieService 
    private router: Router){}
  ngOnInit(): void {
    //this.alreadySelected=false;
    this.aroute.params.subscribe(params=> this.theatreId = params['theatreId']);
    this.showId=sessionStorage.getItem("showId");
    //this.aroute.params.subscribe(params=> this.noOfSeats = params['noOfTickets']);
   //this.noOfSeats=this.tickets;
    this.theatreServ.getShows(this.theatreId).subscribe(shows=>{
      this.showTimes=shows;
      console.log(shows);
    })
    this.showTicketDetails(this.showId);   
    
/* 
    this.theatreServ.getSeatsInfo(this.theatreId).subscribe(seats=>{
      console.log(seats);
      this.seatsArray=seats;
    })
 */  } 
  onProceed()
  {
    /* if(this.noOfSeats>0)
    {
      this.showTicketDetails()
    }
    else
    {
      alert("please select how many tickets required");
    } */
  }
  showTicketDetails(showId:any)
  {
    this.showServ.getSeatInfoByShow(this.theatreId,showId).subscribe(seats=>{
      console.log(seats);
      this.seatsArray=seats;
    })
  }
  onSelectedSeat(isBooked:boolean,seat:any)
  {
    if(!isBooked)
    {
      let selected:number;
        selected= this.selectedSeats.indexOf(seat);
        if(selected==-1)
        {
          if(this.selectedSeats.length!=this.noOfSeats)
          {
              this.selectedSeats.push(seat);
              //this.seatNumbers=seat.seatNumber;
              seat.selected=true;
          }
          else
          {
            //this.selectedSeats.forEach(seat,'seat.selected=false');
            for(let i=0;i<this.selectedSeats.length;i++)
            {
              this.selectedSeats[i].selected=false;
              this.selectedSeats.slice(this.selectedSeats.indexOf(seat),1);
              
            }
            this.selectedSeats=[];
            console.log(this.selectedSeats);
            this.selectedSeats.push(seat);
            seat.selected=true;
          }
        }
        else
        {
          this.selectedSeats.splice(this.selectedSeats.indexOf(seat),1);
          seat.selected=false;

        }
        // this.selectedSeats.forEach(s=>{this.seatNumbers+","+s.seatNumber});
       sessionStorage.setItem("seatsCount",this.selectedSeats.length.toString());
       sessionStorage.setItem("seatNumbers",this.seatNumbers);
       //alert(this.selectedSeats.length);
       //alert(this.seatNumbers);
        //forEach(s=>s.id==seat.id?this.selectedSeats.splice(this.selectedSeats.indexOf(s),1):);
      //this.selectedSeats.push(seat);  
      console.log("selected seats:");
      console.log(this.selectedSeats); 
      console.log(this.seatNumbers); 
    }
    else
    {
      alert("This Seat is not available to this.booking.Plz select other");
    }
  }

  payForTheTickets()
  {
    //alert(this.selectedSeats.length);
    for(let i=0;i<this.selectedSeats.length;i++)
    {
      //console.log(this.seatNumbers);
      if(this.seatNumbers==null)
      {
        this.seatNumbers=this.selectedSeats[i].seatNumber;
       // alert(this.getTicketPrice(this.selectedSeats[i].seatType));
        
      }
      else
      {
        this.seatNumbers=this.seatNumbers+","+this.selectedSeats[i].seatNumber;
      } 
      
    }
      sessionStorage.setItem("seats",JSON.stringify(this.selectedSeats));
    console.log(this.seatNumbers);
    sessionStorage.setItem("selectedSeats",this.seatNumbers);
    sessionStorage.setItem("theatre",this.theatreId.toString());
    this.getSeatsDetails();
    this.totalAmount= this.getTotalAmount();
    sessionStorage.setItem("totalAmount",this.totalAmount.toString())
    console.log(this.seatNumbers);
    console.log(this.theatreId);
    console.log(this.totalAmount);
    
    
    //this.aroute.params.subscribe(params=> this.theatreId = params['theatreId']);
    //this.router.navigate["/confirmation/"+this.seatNumbers];
    this.router.navigate(['/confirmation' ]);
  }
  

 getSeatsDetails()
  {
    this.seatsArray= this.seatNumbers.split(',');
    console.log(this.seatsArray);  

  }
  getTicketPrice(type:string):any{
   return this.theatreServ.getPriceOfTicket(type);
  }
  getTotalAmount():number
  {
    console.log(this.selectedSeats);
    for(let i=0;i<this.selectedSeats.length;i++)
    {
      this.totalAmount=this.totalAmount+this.getTicketPrice(this.selectedSeats[i].seatType);
       
      console.log(this.totalAmount);
      //alert(this.totalAmount);
      
    }
    return this.totalAmount;
   
  }
 
  /*
  orderSnack!:IOrderSnack;
  payment!:IPayment;
  paymentID!:number;
  constructor(
    private rouite:ActivatedRoute,
    private movieContext:MovieService,
    private showContext:ShowService,
    private cinemaHallContext:CinemaHallService,
    private cinemaSeatContext:CinemaSeatService,
    private showSeatContext:ShowSeatService,
    private productContext:ProductService,
    private bookingContext:BookingService,
    private userContext:UserService,
    private orderSnackContext:OrderSnackService,
    private paymentContext:PaymentService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.userContext.user.subscribe(x=> this.user = x);
    this.totalTicketPrice=0;
   this.rouite.params.subscribe(params=> {this.ShowID = params['showID']; this.MovieID = params['movieID']});
   this.movieDetails(this.MovieID);
   this.getShow();
   this.checkIfselectedLocalStorage()
  }
  movieDetails(id:number){
    this.movieContext.getMovieById(id).subscribe((movieResult)=>
    {this.Movie = movieResult;
   });
  }
  getProducts(id:number){
    this.productContext.getProductById(id).subscribe((productResult)=>
    {
      return productResult;
    })
  }
  getShow(){
    this.showContext.getShowByShowID(this.ShowID).subscribe((showResult)=>
    {
      this.Show = showResult;
      this.getCinemaHall(showResult.cinemaHallID);
      this.getShowSeats(showResult.showID);

    })
  }
  getCinemaHall(id:number){
    this.cinemaHallContext.getCinemaHallById(id).subscribe((CinemaHallResult)=>
    {

      this.CinemaHall = CinemaHallResult;
    })
  }
  getShowSeats(id:number){
    this.showSeatContext.getShowSeatsByShowID(id).subscribe((showSeatsResult)=>
    {
      this.ShowSeats = showSeatsResult;
    })
  }

  onBooking(){
    if(this.user){

    var savedSeats = JSON.parse(localStorage.getItem('SelectedSeats')!)|| [];
    this.storedSeat = savedSeats;

    if(this.normalTicket > 0 && this.storedSeat.length > 0){
      var todayDate = new Date();
    var newbooking = this.booking ={
      status :1,
      showID : this.Show.showID,
      timeStamp : todayDate,
      userID : this.user.userID,
      numberOfSeats : this.normalTicket
    }

    this.bookingContext.createBooking(newbooking).subscribe((bookingresult)=>
    {
      console.log(bookingresult);
      for(var i=0; i< this.storedSeat.length;i++){
        this.storedSeat[i].bookingID = bookingresult.bookingID;
        this.showSeatContext.updateShowSeat(this.storedSeat[i].showSeatID,this.storedSeat[i]).subscribe();

      }
     this.onOrderSnack(bookingresult.bookingID!);
     this.onPayment(bookingresult.bookingID!);
     console.log(this.paymentID);

    });

  }
}
else{
  this.router.navigate(['/login']);
}

  }
  onPayment(bookingID:number){
    var totalPrice = this.totalSnackPrice+this.totalTicketPrice;
    var newPayment = this.payment ={
      amount:totalPrice,
      timeStamp:new Date(),
      paymentMethod:1,
      bookingID:bookingID,
      discountCuponID:0
    }
    this.paymentContext.createPayment(newPayment).subscribe((paymentResult)=>{
      console.log(paymentResult);
      this.paymentID = paymentResult.paymentID!;
     this.router.navigate(['/movie',this.MovieID,'show',this.ShowID,'booking', bookingID,'ticket',this.paymentID])

    })
  }
  onOrderSnack(bookingID:number){
    if(this.softDrink != 0){
      var newSnacks = this.orderSnack={
        quantity:this.softDrink,
        bookingID:bookingID,
        productID:1
      }
      this.orderSnackContext.createOrderSnack(newSnacks).subscribe(g=>console.log(g));
    }
    if(this.snackMenu != 0){
      var newSnacks = this.orderSnack={
        quantity:this.snackMenu,
        bookingID:bookingID,
        productID:5
      }
      this.orderSnackContext.createOrderSnack(newSnacks).subscribe(g=>console.log(g));

    }
    if(this.popCorn != 0){
      var newSnacks = this.orderSnack={
        quantity:this.popCorn,
        bookingID:bookingID,
        productID:2
      }
      this.orderSnackContext.createOrderSnack(newSnacks).subscribe(g=>console.log(g));

    }

  }
  convertMinuteToHour(minute:number){
    var hours = this.math.floor(minute/60);
    var minutes = minute % 60;
    var duration = hours+" H : " +minutes + "M";
    return duration;
  }

  checkIfselectedLocalStorage(){
    var storedSeats = JSON.parse(localStorage.getItem('SelectedSeats')!)|| [];
    if(storedSeats !== null && storedSeats.length > 0){
      for(var i=0;i<storedSeats.length;i++){
        storedSeats.splice(i,2)
       localStorage.setItem("SelectedSeats", JSON.stringify(storedSeats));

        console.log(storedSeats[i]);

      }
    }
  }

  onSelected(seat:any){
    var storedSeats = JSON.parse(localStorage.getItem('SelectedSeats')!)|| [];
    if(seat.bookingID){
      for(var i =0;i < storedSeats.length;i++){
        if(storedSeats[i].showSeatID == seat.showSeatID){
          storedSeats.splice(i,1);
        }
      }
    }
    // if(seat.bookingID == null){
    // }
    // else{
    //   seat.booked = true;
    // }
    if(seat.active==true && !seat.bookingID){
      seat.active=false;
      this.avialableSeat--;
      this.totalTicketPrice = this.totalTicketPrice-seat.price;
      for(var i =0;i < storedSeats.length;i++){
        if(storedSeats[i].showSeatID == seat.showSeatID){
          storedSeats.splice(i,1);
        }
      }
      console.log(storedSeats)
      localStorage.setItem("SelectedSeats", JSON.stringify(storedSeats));
    }
    else if(this.avialableSeat < this.normalTicket && !seat.bookingID){
      seat.active=true;
      this.avialableSeat++;
      this.totalTicketPrice = this.totalTicketPrice+seat.price;
      storedSeats.push(seat);
      localStorage.setItem("SelectedSeats", JSON.stringify(storedSeats));
    }
    console.log(seat.showSeatID);
  }

  onMinus(count:number,target:string)
  {
    count = count-1;
    if(count < 0){
      count = 0;
    }
    else{
      if(target == "normalTicket"){
        this.normalTicket = count;
      }
      else if(target == "softDrink"){
        this.softDrink = count
        this.totalSnackPrice= this.totalSnackPrice- 25;

      }
      else if(target == "popCorn"){
        this.popCorn = count
        this.totalSnackPrice= this.totalSnackPrice- 45;

      }
      else if(target == "snackMenu"){
        this.snackMenu = count
        this.totalSnackPrice= this.totalSnackPrice- 99;

      }
    }

  }
  onPlus(count:number,target:string)
  {
    count = count+1;
    if(count > 9){
      count = 9;
    }
    else{

    if(target == "normalTicket"){
      this.normalTicket = count;
    }
    else if(target == "softDrink"){
      this.softDrink = count
      this.totalSnackPrice = this.totalSnackPrice + 25;

    }
    else if(target == "popCorn"){
      this.popCorn = count
      this.totalSnackPrice = this.totalSnackPrice + 45;

    }
    else if(target == "snackMenu"){
      this.snackMenu = count
      this.totalSnackPrice = this.totalSnackPrice+ 99;
    }
  }


  }
*/

}

import { Component } from '@angular/core';
import { Seats } from 'src/app/Model/seats';
//import { Seat } from 'src/app/Model/seat';

@Component({
  selector: 'app-add-seats',
  templateUrl: './add-seats.component.html',
  styleUrls: ['./add-seats.component.css']
})
export class AddSeatsComponent {
  screenNumbar: number;
  seatType: String;
  rowName: String;
  noOfSeats: number;
  seatscount: number[] = [];
  seatsArray: Seats[] = [];
  seat: Seats;
  isequaltocolumns: boolean = false;
  customSeatId: String;

  constructor() { }

  ngOnInit() { }

  public myclass = {
    "row": this.isequaltocolumns,
    "seatI": this.isequaltocolumns
  }

  onClickMe() {

    for (let i = 1; i <= this.noOfSeats; i++) {
      this.seat = new Seats();
      this.seat.screenNumber = this.screenNumbar;
      this.seat.seatNumber = i;
      this.seat.divId = this.screenNumbar + "_" + this.seatType + "_" + this.rowName + "_";
      this.customSeatId = this.screenNumbar + "_" + this.seatType + "_" + this.rowName + "_";
      this.seat.noOfSeatsperRow = this.noOfSeats;
      this.seatsArray.push(this.seat);
      if (i == this.noOfSeats) {
        this.isequaltocolumns = true;
        console.log(this.isequaltocolumns);
      }
    }

  }

  clearArray() {


  }

}


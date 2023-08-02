import { Component } from '@angular/core';

@Component({
  selector: 'app-dummy-seats',
  templateUrl: './dummy-seats.component.html',
  styleUrls: ['./dummy-seats.component.css']
})
export class DummySeatsComponent {
  row: Number;
  seats: number=50;
  theatreArr = [];

 onSubmit() {
   // create seats dummy array... 
   const dummySeats = [];
   for(let i = 0; i < this.seats; i++)  {
     dummySeats.push(i);
   }
   this.theatreArr.push({row: this.row, seats: dummySeats});
   this.theatreArr.sort((a, b) => a.row - b.row);
   console.log(this.theatreArr);
 }
}

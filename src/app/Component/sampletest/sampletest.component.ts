import { Component } from '@angular/core';
import { faSquareDribbble } from '@fortawesome/free-brands-svg-icons';
import { faSquareFull } from '@fortawesome/free-regular-svg-icons';
import { faCircle, faFilm, faSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sampletest',
  templateUrl: './sampletest.component.html',
  styleUrls: ['./sampletest.component.css']
})
export class SampletestComponent {
filmIcon=faFilm;
circle=faSquareFull;
square=faSquare;
count:number[]=[1,2,3,4,5];
}

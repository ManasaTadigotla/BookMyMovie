import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Genre } from 'src/app/genre';
import { GenreService } from 'src/app/service/genre.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {

  genreInfo: Genre[]=[] ;
  p:number=0;
  name:string="";
  key:string = "name";
  reverse:boolean=false;
  oldGenreName!:string;

  enableEdit = false;
  enableEditIndex = null;
  isAddClicked:boolean=false;
  newGenreName!:string;
  

  constructor(private genreServ:GenreService,
    private router: Router){}

  ngOnInit(): void {
   this.viewAll();
  }


    viewAll()
  {
    this.genreServ.getGenres().subscribe(data=>{
      this.genreInfo = data;
      console.log(data);
    });
  }
  deleteEmployee(id:number)
  {
    this.genreServ.deleteGenre(id).subscribe(()=>{
      this.viewAll();
    });
  }

  modifyGenre(id:number,i:number)
  {
    console.log(i);

    //this.router.navigate(['/', id]);
  }

  viewOneEmp(id:number)
  {
    this.router.navigate(['/viewone', id]);
  }

 
  Sorting(key:any)
  {
    this.key = key;
    this.reverse= !this.reverse;
  }

 // firstName:string;
  SearchGenre()
  {
    if(this.name=="")
    {
      this.viewAll();
    }
    else
    {
      console.log(this.name);
      this.genreInfo = this.genreInfo.filter(genreobj=>{
        return genreobj.name.toLocaleLowerCase().match(this.name);
      });
    }
  }

  enableEditMethod(e:any, i:any,genre:Genre) {
    this.enableEdit = true;
    this.enableEditIndex = i;

    console.log(i, e);
  }

  cancelEdit()
  {
    this.viewAll();
    this.enableEdit=false;
    console.log(this.oldGenreName);
    //genre.name=this.oldGenreName;
  }
  saveGenre(genre:Genre)
  {
    this.genreServ.updateGenreName(genre).subscribe(data=>{
      console.log(data);

      this.enableEdit=false;
    } );
  }

  deleteGenre(id:number)
  {
    this.genreServ.deleteGenre(id).subscribe(data=>{
      console.log(data);
      this.enableEdit=false;
      this.viewAll();
    });
  }

  addNewGenre()
  {
    let genre:Genre=new Genre();
    genre.name=this.newGenreName;
    console.log(genre);
    this.genreServ.addNewGenre(genre).subscribe(data=>{
      console.log(data);
      alert("New genre is added successfully");
      this.viewAll();
    })

  }

}

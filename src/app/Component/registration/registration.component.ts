import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  color:string="green";
  genders:any;
  msg:string="";
  locations:any;
  userType:any;
 NewUser!:FormGroup;
  constructor(private builder:FormBuilder,
    private userServ:UserService,
   // private loginServ:LoginService,
    private router:Router ) { }

  ngOnInit(): void {
    this.locations=["hyderabad","Karnataka","bangalore","mangalore"];
    this.userType=["admin","user"];
    this.NewUser=this.builder.group({
      firstName:this.builder.control('',[Validators.minLength(5),Validators.required]),
      lastName:this.builder.control('',[Validators.required]),
      email :this.builder.control('',[Validators.required,Validators.email]),
      phone :this.builder.control([Validators.minLength(10),Validators.maxLength(10),Validators.pattern("[0-9]*$"),Validators.required]),
      password:this.builder.control('',[Validators.minLength(5),Validators.required]),
      location:this.builder.control('',[Validators.required]),
      userType:this.builder.control('',[Validators.required])    
      
    });
   
  }

  
  createUser(regForm:any)
  {
    let isExists:boolean;
    console.log(regForm.value.phone);
    this.userServ.checkUserByPhone(regForm.value.phone).subscribe(res=>{
      isExists=res;

      console.log(res);
      if(!isExists)
    {
      this.userServ.addNewUser(regForm.value).subscribe(data=>{
        console.log(regForm.value);
        if(data!=null)
        {
          alert("Registered successfully...")
          this.router.navigateByUrl("/login");
        }
      });
    } 
    else
    {
      alert("This Number is already registered!! Please provide another Phone number")
    }
  
    })
    
    
  }
  
 
 
 

  /*
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  say()
  {
    alert("hi");
  }
  changeClour()
  {
    alert(this.color);
    if(this.color=="green")
    {

      this.color="warn";
      return;
    }
    else if(this.color=="warn")
    {
      this.color="green";
    }
  }
  */

}

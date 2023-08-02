import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  msg: string = "";
  phone!: number;
  pswd!: string;
  constructor(private logServ: UserService,
    private router: Router) {

    sessionStorage.removeItem("user"); // it will delete all the values from session
  }

  ngOnInit(): void {
    sessionStorage.clear();
  }

  CheckUserDetails() {
    /* if(this.phone==9876543210 && this.pswd=="123")
    {
      sessionStorage.setItem('user', this.phone.toString());
      //isNavbarVisiableAdmin:boolean=false;
  
      this.router.navigate(['/viewallmovies']);

    } else
    { */
    this.logServ.getUserByPhone(this.phone).subscribe((res) => {
      console.log(res);
      const user = res;
      if (user) {
        if (user.password == this.pswd) {

          console.log(user);
          sessionStorage.setItem("user", this.phone.toString());
          sessionStorage.setItem("userType", user.userType);
          alert(user.userType);
          //const previousUrl = sessionStorage.getItem("previousUrl");
          if (user.userType == "admin") {
            //alert(user.userType);
            //alert("login as admin");
            
            this.router.navigate(['/viewallmovies']);

          }
          else {
            this.router.navigate(['/userhome']);
          }
        }
        else {
          //alert("plz check phone number/password")
          this.msg = ("Plz check phone number/password");
        }
      }
      else {
        this.msg = "This is not registered number.plz register";
      }
    });
  }
  //}


}

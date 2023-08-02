import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user!:any;
  apiUrl:string="http://localhost:8188/users";
  constructor(private http:HttpClient) { }

  getUserByPhone(phone:number):Observable<any>
  {
    return this.http.get<any>(`${this.apiUrl}/${phone}`);
  }

  checkUserByPhone(phone:number):Observable<any>
  {
    return this.http.get<any>("http://localhost:8188/user/check/"+phone);
  }

  LoginCheck(phone:any, pwd:any):boolean
  {
    let isValidUser=false;
     this.user= this.getUserByPhone(phone).subscribe((res:any)=>{
      console.log(res);
      const user= res;
      if(user)
      {
       alert("valid");
      isValidUser=true;  
      //alert(isValidUser); 
      }
      alert(isValidUser);
      
    })
    alert(isValidUser);
    return isValidUser;
    
  }

  CheckLoginUser()
  {
    return sessionStorage.getItem('user')!=null;
  }

  addNewUser(user:User):Observable<User>
  {
    return this.http.post<User>("http://localhost:8188/user/add",user);
  }
}

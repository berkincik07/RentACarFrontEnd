import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/models/result';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/my-Alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public apiService:ApiService,
    public alert:MyAlertService

  ) { }

  ngOnInit() {
  }

  Login(customerUsername:string,password:string){
    this.apiService.getToken(customerUsername,password).subscribe((d : any)=>{
      localStorage.setItem("token",d.access_token)
      localStorage.setItem("uid",d.customerId)
      localStorage.setItem("customerUsername", d.customerUsername)
      localStorage.setItem("customerAuth",d.customerAuth)
      location.href = "/";
    },err=>{
      var r: Result = new Result();
      r.success = false;
      r.message = "Kullanıcı adı veya parola geçersiz."
      this.alert.Alert(r)
    })

    
  }
  

}

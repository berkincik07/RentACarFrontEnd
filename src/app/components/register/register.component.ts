import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/models/result';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/my-Alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  
  constructor(
    public apiService:ApiService,
    public alert:MyAlertService

  ) { }

  ngOnInit() {
  }



    
  }



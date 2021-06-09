import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Car } from 'src/app/models/car';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-car-dialog',
  templateUrl: './car-dialog.component.html',
  styleUrls: ['./car-dialog.component.css']
})
export class CarDialogComponent implements OnInit {
dialogHeader!:string;
process!:string;
form!:FormGroup;
newCar!:Car
  constructor(
    public apiService:ApiService,
    public matDialog:MatDialog,
    public formBuild:FormBuilder,
    public dialogRef:MatDialogRef<CarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { 
    this.process=data.process;
    this.newCar=data.car;
    if (this.process == 'add'){
      this.dialogHeader = "Araç Ekle";
    }
    if (this.process == 'edit'){
      this.dialogHeader = "Araç Düzenle";
    }
    this.form = this.CreateForm();
  }

  ngOnInit() {

  }

  CreateForm(){
    return this.formBuild.group({
      carDailyPrice:[this.newCar.dailyPrice],
      carDescription:[this.newCar.description],
      carModelName:[this.newCar.modelName],
      carModelYear:[this.newCar.modelYear]
    });
  }

}

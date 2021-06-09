import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from 'src/app/models/customer';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customer-dialog.component.html',
  styleUrls: ['./customer-dialog.component.css']
})
export class CustomerDialogComponent implements OnInit {
dialogHeader!:string;
process!:string;
form!:FormGroup;
newCustomer!:Customer
  constructor(
    public apiService:ApiService,
    public matDialog:MatDialog,
    public formBuild:FormBuilder,
    public dialogRef:MatDialogRef<CustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { 
    this.process=data.process;
    this.newCustomer=data.customer;
    if (this.process == 'add'){
      this.dialogHeader = "Müşteri Ekle";
    }
    if (this.process == 'edit'){
      this.dialogHeader = "Müşteri Düzenle";
    }
    this.form = this.CreateForm();
  }

  ngOnInit() {

  }

  CreateForm(){
    return this.formBuild.group({
      customerName:[this.newCustomer.customerName],
      customerBirthDate:[this.newCustomer.customerBirthDate],
      customerMail:[this.newCustomer.customerMail]
    });
  }

}

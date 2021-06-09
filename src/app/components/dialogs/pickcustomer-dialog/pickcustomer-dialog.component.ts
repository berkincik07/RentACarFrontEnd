import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/models/customer';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/my-Alert.service';
import { AddphotoDialogComponent } from '../addphoto-dialog/addphoto-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CustomerDialogComponent } from '../customer-dialog/customer-dialog.component';

@Component({
  selector: 'app-pickcustomer-dialog',
  templateUrl: './pickcustomer-dialog.component.html',
  styleUrls: ['./pickcustomer-dialog.component.css']
})
export class PickcustomerDialogComponent implements OnInit {

  customers!:Customer[];
  displayedColumns=['customerId','customerName','customerBirthDate','customerMail','customerCarCount',"process"]
  dataSource:any;
  @ViewChild(MatSort) sort!:MatSort
  @ViewChild(MatPaginator) paginator!:MatPaginator
photoDialogRef!:MatDialogRef<AddphotoDialogComponent>;
confirmDialogRef!:MatDialogRef<ConfirmDialogComponent>;
constructor(
    public apiService:ApiService,
    public matDialog:MatDialog,
    public alert:MyAlertService,
    public dialogRef:MatDialogRef<CustomerDialogComponent>
  ) { }

  ngOnInit() {
    this.listCustomer();
  }
  listCustomer(){
  this.apiService.listCustomer().subscribe((d: any) =>{
    this.customers=d;
    this.dataSource = new MatTableDataSource(this.customers);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  })
  }

  filter(e:any){
    var value = e.target.value;
    this.dataSource.filter=value.trim().toLowerCase();
    if(this.dataSource.peginator){
      this.dataSource.peginator.firstPage();
    }
  }

  pickedCustomer(customer:Customer){
    this.dialogRef.close(customer);
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { Record } from 'src/app/models/record';
import { Result } from 'src/app/models/result';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/my-Alert.service';
import { CarComponent } from '../car/car.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { PickcustomerDialogComponent } from '../dialogs/pickcustomer-dialog/pickcustomer-dialog.component';

@Component({
  selector: 'app-listcustomers',
  templateUrl: './listcustomers.component.html',
  styleUrls: ['./listcustomers.component.css']
})
export class ListcustomersComponent implements OnInit {
  carId!: string;
  records!: Record[];
  pickedCar!: Car;
  customers!:Customer[];
  displayedColumns=['customerPhoto','customerId','customerName','customerBirthDate','customerMail','customerCarCount',"process"]
  dataSource:any;
  dialogRef!:MatDialogRef<PickcustomerDialogComponent>;
  @ViewChild(MatSort) sort!:MatSort
  @ViewChild(MatPaginator) paginator!:MatPaginator
  confirmDialogRef!:MatDialogRef<ConfirmDialogComponent>

  constructor(
    public apiService:ApiService,
    public route : ActivatedRoute,
    public matDialog : MatDialog,
    public alert: MyAlertService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p=>{
      this.carId=p.carId;
      this.carById();
      this.listRecords();
    })
  }

  listRecords(){
    this.apiService.listCarRent(this.carId).subscribe((d: any) =>{
      this.records=d;
      this.dataSource = new MatTableDataSource(this.records);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      
    })
    }
    

  carById(){
    this.apiService.carById(this.carId).subscribe((c:any)=>{
      this.pickedCar = c;
    });
  }

  add(){
    this.dialogRef = this.matDialog.open(PickcustomerDialogComponent,{
      width:'500px'
    });
    this.dialogRef.afterClosed().subscribe(v=>{
      if(v){
        var record = new Record();
        record.recordCustomerId = v.customerId;
        record.recordCarId = this.carId

        this.apiService.addRecord(record).subscribe((r: any)=>{
          this.alert.Alert(r);
          if (r.success){
            this.listRecords();
          }
        });
      }
    });
  }

  delete(record:Record){
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent,{
      width:'500px'
    })

    this.confirmDialogRef.componentInstance.dialogMessage = record.customerInformation.customerName + " isimli müşterinin bu araçtan kaydı silinecektir onaylıyor musunuz ? "

    this.confirmDialogRef.afterClosed().subscribe(d=>{
      if(d){
        this.apiService.deleteRental(record.rentalId).subscribe((r:any) =>{
          this.alert.Alert(r);
          if (r.success){
            this.listRecords();
          }
        })
      }
    })
  }
}

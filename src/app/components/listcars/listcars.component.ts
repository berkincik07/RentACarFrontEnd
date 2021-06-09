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
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-listcars',
  templateUrl: './listcars.component.html',
  styleUrls: ['./listcars.component.css']
})
export class ListcarsComponent implements OnInit {
  records!: Record[];
  record!: Record;
  pickedCustomer!:Customer;
  cars!: Car[];
  customerId!:string;
  carId!: string;
  dataSource:any ;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  confirmDialogRef!:MatDialogRef<ConfirmDialogComponent>;
  displayedColumns=['carId','modelName','modelYear','dailyPrice','process'];

  constructor(
    public apiService:ApiService,
    public alert:MyAlertService,
    public route:ActivatedRoute,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p=>{
      if(p){
        this.customerId = p.customerId;
        this.getCustomer();
        this.listCustomerRent();
        this.listCars();
      }
    });
  }

getCustomer(){
  this.apiService.customerById(this.customerId).subscribe((d:any)=>{
    this.pickedCustomer = d;
  });
}

listCustomerRent(){
  this.apiService.listCustomerRent(this.customerId).subscribe((d:any)=>{
    this.records = d;
    this.dataSource = new MatTableDataSource(this.records);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  });

}

  listCars(){
    this.apiService.listCar().subscribe((d:any)=>{
      this.cars = d;
    });
  }

  pickCar(carId:string){
    this.carId = carId;
  }

  save(){

    if (this.carId == undefined){
      var r:Result= new Result();
      r.success=false;
      r.message="Araç seçiniz.";
      this.alert.Alert(r);

      return false;
    }

    var record:Record = new Record();
    record.recordCarId =this.carId
    record.recordCustomerId = this.customerId

    this.apiService.addRecord(record).subscribe((r: any)=>{
      this.alert.Alert(r);
      if(r.success){
        this.listCustomerRent();
      }
    })
    return false;
  }

  delete(record:Record){
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent,{
      width:'400px'
    });
    this.confirmDialogRef.componentInstance.dialogMessage = record.customerInformation.customerName+ " isimli müşterinin "+ record.carInformation.modelName + " model aracı kiraladığının Kaydı silinecektir onaylıyor musunuz ? ";
    this.confirmDialogRef.afterClosed().subscribe(d=>{
      console.log(d);
      if(d){
        this.apiService.deleteRental(record.rentalId).subscribe((r : any)=>{
          this.alert.Alert(r);
      if(r.success){
        this.listCustomerRent();
      }
        })
      }
    })
  }

}

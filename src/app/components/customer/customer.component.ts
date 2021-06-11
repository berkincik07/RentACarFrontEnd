import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/models/customer';
import { customerPhoto } from 'src/app/models/customerPhoto';
import { Result } from 'src/app/models/result';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/my-Alert.service';
import { AddphotoDialogComponent } from '../dialogs/addphoto-dialog/addphoto-dialog.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { CustomerDialogComponent } from '../dialogs/customer-dialog/customer-dialog.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  customers!:Customer[];
  displayedColumns=['customerPhoto','customerId','customerName','customerBirthDate','customerMail','customerCarCount',"process"]
  dataSource:any;
  @ViewChild(MatSort) sort!:MatSort
  @ViewChild(MatPaginator) paginator!:MatPaginator
dialogRef!:MatDialogRef<CustomerDialogComponent>;
photoDialogRef!:MatDialogRef<AddphotoDialogComponent>;
confirmDialogRef!:MatDialogRef<ConfirmDialogComponent>;
constructor(
    public apiService:ApiService,
    public matDialog:MatDialog,
    public alert:MyAlertService,
    private breakpointObserver: BreakpointObserver
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

  add(){
    var newCustomer:Customer = new Customer();
    this.dialogRef = this.matDialog.open(CustomerDialogComponent,{
      width:'400px',
      data:{
        customer!: newCustomer,
        process: 'add'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d){
      this.apiService.addCustomer(d).subscribe((r: any)=>{
        this.alert.Alert(r)
        if (r.success){
          this.listCustomer();
        }
      });
    }
    });
    
  }
  edit(customer:Customer){
    this.dialogRef = this.matDialog.open(CustomerDialogComponent,{
      width:'400px',
      data:{
        customer!: customer,
        process: 'edit'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d){

      customer.customerName = d.customerName;
      customer.customerMail = d.customerMail;
      customer.customerBirthDate = d.customerBirthDate;

      this.apiService.updateCustomer(customer).subscribe((r: any)=>{
        this.alert.Alert(r);
      });
    }
    });
    
  }

  delete(customer: Customer){
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent,{
      width:'500px',
    });
    this.confirmDialogRef.componentInstance.dialogMessage=customer.customerName + " isimli müşteri silinecektir. Onaylıyor musunuz ?"

    this.confirmDialogRef.afterClosed().subscribe(d=>{
      if(d){
        this.apiService.deleteCustomer(customer.customerId).subscribe((r:any) =>{
          this.alert.Alert(r);
          if(r.process){
            this.listCustomer();
          }
        });
      }
    });
  }
  updatePhoto(customer: Customer){
    this.photoDialogRef = this.matDialog.open(AddphotoDialogComponent,{
      width:'400px',
      data:customer
    })
    this.photoDialogRef.afterClosed().subscribe((d : customerPhoto)=>{
      if(d){
        console.log(d);
        d.customerId=customer.customerId;
        this.apiService.updateCustomerPhoto(d).subscribe((r:any)=>{
          this.alert.Alert(r);
          if(r.process){
            this.listCustomer();
          }
        })
      }
    })
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Car } from 'src/app/models/car';
import { Result } from 'src/app/models/result';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/my-Alert.service';
import { CarDialogComponent } from '../dialogs/car-dialog/car-dialog.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AddphotoDialogComponent } from '../dialogs/addphoto-dialog/addphoto-dialog.component';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );
confirmDialogRef!:MatDialogRef<ConfirmDialogComponent>;
cars !: Car[];
dataSource: any;
displayedColumns = ['carId','modelName','modelYear','dailyPrice','customerCount','carPhoto'];
@ViewChild(MatSort) sort!:MatSort
@ViewChild(MatPaginator) paginator!:MatPaginator
dialogRef!:MatDialogRef<CarDialogComponent>;
  photoDialogRef!: MatDialogRef<AddphotoDialogComponent>;
  constructor(
    public apiService : ApiService,
    public alert: MyAlertService,
    public matDialog: MatDialog,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit() {
    this.listCars();
  }

  listCars(){
    this.apiService.listCar().subscribe((c:any) =>{
      this.cars = c;
      this.dataSource = new MatTableDataSource(c);
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
  var newCar:Car = new Car();
  this.dialogRef = this.matDialog.open(CarDialogComponent,{
    width:'400px',
    data:{ 
      car!: newCar,
      process: 'add'
    }
  });
  this.dialogRef.afterClosed().subscribe(d=>{
    if (d){
      this.apiService.addCar(d).subscribe((r:any )=> {
        this.alert.Alert(r)
          if(r.success){
            this.listCars();
          }
        
      });
    }
  });
}

  update(car:Car){
    this.dialogRef = this.matDialog.open(CarDialogComponent,{
      width:'400px',
      data:{
        car!: car,
        process: 'update'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d){
        d.carId = car.carId
        this.apiService.updateCar(d).subscribe((r:any )=> {
          this.alert.Alert(r)
            if(r.success){
              this.listCars();
            }
          
        });
      }
    });
  
  }


  delete(car:Car){
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent,{
      width:'500px'
    })
    this.confirmDialogRef.componentInstance.dialogMessage = car.modelName + " model araç silinecektir. Onaylıyor musunuz ?"
    this.confirmDialogRef.afterClosed().subscribe(v =>{
      if(v){
        this.apiService.deleteCar(car.carId).subscribe((r:any)=>{
          this.alert.Alert(r);
          if(r.success){
            this.listCars();
          }
        })
      }
    })
   
  }

  updatePhoto(car: Car){
    this.photoDialogRef = this.matDialog.open(AddphotoDialogComponent,{
      width:'400px',
      data:car
    })
    this.photoDialogRef.afterClosed().subscribe((d : any)=>{
      if(d){
        console.log(d);
        d.carId=car.carId;
        this.apiService.updateCustomerPhoto(d).subscribe((r:any)=>{
          this.alert.Alert(r);
          if(r.process){
            this.listCars();
          }
        })
      }
    })
  }

}

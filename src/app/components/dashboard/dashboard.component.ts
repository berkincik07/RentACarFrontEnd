import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Result } from 'src/app/models/result';
import { MyAlertService } from 'src/app/services/my-Alert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  confirmDialogRef!: MatDialogRef<ConfirmDialogComponent>; // !
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(
    public alert:MyAlertService,
    public matDialog:MatDialog,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit(){
  }

  OpenAlert(p:boolean){

    var r:Result = new Result();
    r.success = p
    r.message = "Alert mesajıdır...";

    this.alert.Alert(r);
  }

  OpenConfirm(){
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent,{
      width:'400px'
    });
    this.confirmDialogRef.componentInstance.dialogMessage = "Araç silinecektir onaylıyor musunuz ? ";
    this.confirmDialogRef.afterClosed().subscribe(d=>{
      console.log(d);
      if(d){
        // Silme
      }
    })
  }
}

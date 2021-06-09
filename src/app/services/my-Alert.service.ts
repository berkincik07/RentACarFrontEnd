import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertDialogComponent } from '../components/dialogs/alert-dialog/alert-dialog.component';
import { Result } from '../models/result';

@Injectable({
  providedIn: 'root'
})
export class MyAlertService {
  alertDialogRef!: MatDialogRef<AlertDialogComponent>; // ! kaldırabilirsin.
  
  constructor(
    public matDialog:MatDialog
  ) { }

  Alert(r: Result){
    var alertHeader= "";
    if (r.success){
      alertHeader = "İşlem Tamamlandı.";
    }else{
      alertHeader = "İşlem Tamamlanamadı.";
    }

    this.alertDialogRef=this.matDialog.open(AlertDialogComponent,{
      width: '300px'
    });
    this.alertDialogRef.componentInstance.dialogHeader=alertHeader;
    this.alertDialogRef.componentInstance.dialogMessage=r.message;
    this.alertDialogRef.componentInstance.dialogResult=r.success;

    this.alertDialogRef.afterClosed().subscribe(d=> {
      this.alertDialogRef // = null
    });
  }

}

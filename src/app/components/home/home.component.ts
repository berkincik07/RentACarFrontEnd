import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Result } from 'src/app/models/result';
import { MyAlertService } from 'src/app/services/my-Alert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  confirmDialogRef!: MatDialogRef<ConfirmDialogComponent>; // !
  constructor(
    public alert:MyAlertService,
    public matDialog:MatDialog
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

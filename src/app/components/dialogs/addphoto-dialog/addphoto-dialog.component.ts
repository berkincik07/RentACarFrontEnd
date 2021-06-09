import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from 'src/app/models/customer';
import { customerPhoto } from 'src/app/models/customerPhoto';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-addphoto-dialog',
  templateUrl: './addphoto-dialog.component.html',
  styleUrls: ['./addphoto-dialog.component.css']
})
export class AddphotoDialogComponent implements OnInit {
pickedPhoto:any;
customerPhoto:customerPhoto = new customerPhoto();
pickedCustomer!: Customer;
  constructor(
    public photoDialogRef: MatDialogRef<AddphotoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public apiService: ApiService
  ) { 
    this.pickedCustomer = this.data;

  }

  ngOnInit() {
  }
  pickPhoto(e: any){
    var photos = e.target.files;
    var photo = photos[0];

    var fr = new FileReader();
    fr.onloadend=()=>{
      this.pickedPhoto=fr.result;
      this.customerPhoto.photoData != fr.result?.toString();
      this.customerPhoto.photoExtension = photo.type;
    };
    fr.readAsDataURL(photo);
  }
}

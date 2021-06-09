import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../models/car';
import { Customer } from '../models/customer';
import { customerPhoto } from '../models/customerPhoto';
import { Record } from '../models/record';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 apiUrl = "https://localhost:44311/api/";
 siteUrl = "https://localhost:44311/";
constructor(
  public http: HttpClient
) { }

  // Auth işlemleri

  getToken(customerUsername:string, password:string){
    var data = "username="+customerUsername+"&password="+password+"&grant_type=password";
    var reqHeader= new HttpHeaders({"Content-Type":"application/x-www-form-urlencoded"});
    return this.http.post(this.apiUrl+"/token",data,{headers:reqHeader});
  }

  authControl(){
    if(localStorage.getItem("token")){
      return true;
    }else{
      return false;
    }
  }

  

  // Müşteri işlemleri

  listCustomer(){
    return this.http.get(this.apiUrl+"listcustomer");
  }
  customerById(customerId:string){
    return this.http.get(this.apiUrl+"customerbyid/"+ customerId)
  }
  addCustomer(customer:Customer){
    return this.http.post(this.apiUrl+"addcustomer",customer);
  }
  updateCustomer(customer:Customer){
    return this.http.put(this.apiUrl+"updatecustomer",customer);
  }
  deleteCustomer(customerId:string){
    return this.http.delete(this.apiUrl+"deletecustomer"+ customerId);
  }

  updateCustomerPhoto(customerPhoto:customerPhoto){
    return this.http.post(this.apiUrl+"updatecustomerphoto",customerPhoto);
  }

  // Araç işlemleri

  listCar(){
    return this.http.get(this.apiUrl+"listcar");
  }
  carById(carId:string){
    return this.http.get(this.apiUrl+"carbyid/"+ carId)
  }
  addCar(car:Car){
    return this.http.post(this.apiUrl+"addcar",car);
  }
  updateCar(car:Car){
    return this.http.put(this.apiUrl+"updatecar",car);
  }
  deleteCar(carId:string){
    return this.http.delete(this.apiUrl+"deletecar/"+ carId);
  }

  // Kayıt işlemleris

  listCustomerRent(customerId:string){
    return this.http.get(this.apiUrl+ "carsofcustomer/"+ customerId);
  }

  listCarRent(carId:string){
    return this.http.get(this.apiUrl+ "customersofcar/"+ carId);
  }

  addRecord(record:Record){
    return this.http.post(this.apiUrl+"addrental",record);
  }
 
  deleteRental(rentalId:string){
    return this.http.delete(this.apiUrl+"deleterental"+rentalId);
  }
  

}

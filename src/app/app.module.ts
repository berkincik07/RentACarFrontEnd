import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { MyAlertService } from './services/my-Alert.service';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { CarComponent } from './components/car/car.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerDialogComponent } from './components/dialogs/customer-dialog/customer-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListcarsComponent } from './components/listcars/listcars.component';
import { AddphotoDialogComponent } from './components/dialogs/addphoto-dialog/addphoto-dialog.component';
import { CarDialogComponent } from './components/dialogs/car-dialog/car-dialog.component';
import { ListcustomersComponent } from './components/listcustomers/listcustomers.component';
import { PickcustomerDialogComponent } from './components/dialogs/pickcustomer-dialog/pickcustomer-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { ApiService } from './services/api.service';
import { AuthInterceptor } from './services/AuthInterceptor';
import { AuthGuard } from './services/AuthGuard';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MainNavComponent,
    LoginComponent,
    CarComponent,
    ListcarsComponent,
    ListcustomersComponent,
    CustomerComponent,
    AlertDialogComponent,
    ConfirmDialogComponent,
    CustomerDialogComponent,
    AddphotoDialogComponent,
    CarDialogComponent,
    PickcustomerDialogComponent,
    HomeComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AlertDialogComponent,
    ConfirmDialogComponent,
    CustomerDialogComponent,
    AddphotoDialogComponent,
    CarDialogComponent,
    PickcustomerDialogComponent
  ],
  providers: [MyAlertService,ApiService, AuthGuard,
  
  { provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor,multi:true}
],
  bootstrap: [AppComponent]
})
export class AppModule { }

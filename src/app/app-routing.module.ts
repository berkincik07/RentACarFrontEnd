import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { CustomerComponent } from './components/customer/customer.component';
import { HomeComponent } from './components/home/home.component';
import { ListcarsComponent } from './components/listcars/listcars.component';
import { ListcustomersComponent } from './components/listcustomers/listcustomers.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/AuthGuard';

const routes: Routes = [
  {
    path:"", component:HomeComponent
  },
  {
    path:"arac", component:CarComponent,canActivate : [AuthGuard],data:{
      auths:["admin"],
      redirect:'/login'
    }
  },
  {
     path:"musteri", component:CustomerComponent
  },
  {
    path:"listcars/:customerId", component:ListcarsComponent
  },
   {
  path:"listcustomers/:carId", component:ListcustomersComponent
  },
  {
  path:"login", component:LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

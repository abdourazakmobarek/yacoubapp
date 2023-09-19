import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [

  {path:'',component:LoginComponent},
 {path:'admin',component:DashboardComponent,children:[
  {path:'',component:HomeComponent},
  {path:'footer',component:FooterComponent},
  {path:'header',component:HeaderComponent},
 ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

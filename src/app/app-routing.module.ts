import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { EarningsComponent } from './components/earnings/earnings.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { FeedingComponent } from './components/feeding/feeding.component';
import { TeamComponent } from './components/team/team.component';
import { TransferfontComponent } from './components/transferfont/transferfont.component';
import { GetSoleComponent } from './components/get-sole/get-sole.component';
import { OperationsComponent } from './components/operations/operations.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [

  {path:'',component:LoginComponent},
  //
  { path: '', redirectTo: '/login', pathMatch: 'full' },
 {path:'admin',component:DashboardComponent,canActivate:[authGuard], children:[
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  {path:'',component:HomeComponent},
  {path:'footer',component:FooterComponent},
  
  {path:'header',component:HeaderComponent},
  {path:'deposit',component:DepositComponent},
  {path:'operatins',component:OperationsComponent},
  {path:'earnigs',component:EarningsComponent},
  {path:'expenses',component:ExpensesComponent},
  {path:'feeding',component:FeedingComponent},
  {path:'team',component:TeamComponent},
  {path:'getSole',component:GetSoleComponent},
  {path:'transferfont',component:TransferfontComponent},
  {path:'operation',component:OperationsComponent},

 ]},
 {path:'**',component:RegisterComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

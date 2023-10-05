import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { NgxBootstrapIconsModule , allIcons} from 'ngx-bootstrap-icons';
import { DepositComponent } from './components/deposit/deposit.component';
import { EarningsComponent } from './components/earnings/earnings.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { TeamComponent } from './components/team/team.component';
import { TransferfontComponent } from './components/transferfont/transferfont.component';
import { FeedingComponent } from './components/feeding/feeding.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { GetSoleComponent } from './components/get-sole/get-sole.component';
import { OperationsComponent } from './components/operations/operations.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire/compat'
import { MatTableExporterModule } from 'mat-table-exporter';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    DepositComponent,
    EarningsComponent,
    ExpensesComponent,
    TeamComponent,
    TransferfontComponent,
    FeedingComponent,
    GetSoleComponent,
    OperationsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    NgxBootstrapIconsModule.pick(allIcons),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatTableExporterModule,
    AngularFireModule.initializeApp(environment.firebase),
    MaterialModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

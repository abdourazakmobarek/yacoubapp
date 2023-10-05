import { Component, OnInit, ViewChild, } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subscription, interval, map, take } from 'rxjs';
import { Compt } from 'src/app/model/compt.model';
import Operation from 'src/app/model/operation.model';

import firebase from 'firebase/compat/app';
import { DataService } from 'src/app/services/data.service';
import { InitiateService } from 'src/app/services/initiate.service';
import { ServiceService } from 'src/app/services/service.service';
import { FirebaseOperation } from '@angular/fire/compat/database/interfaces';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
interface Oprationtype {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})

export class TeamComponent implements OnInit {

  constructor(private service: ServiceService,
    private db:AngularFireDatabase,
    private initiat: InitiateService,
    private dataService: DataService,
    private router: Router, private toast: ToastrService,
    private builder: FormBuilder) {
    toast.toastrConfig.positionClass = 'toast-top-center';
    toast.toastrConfig.progressAnimation = 'decreasing';
  }

  ngOnInit(): void {
    // this.initiat.CreateBank();
    // this.initiat.CreateCaisse();
    //this.initiat.CreatePortFaille();
    // this.initiat.CreateDepance();
    // this.initiat.CreateDepot();
   //  this.initiat.CreateGain();
  this.getAllopeation();
  this.chargeAllOperation();
  
  }
 
 


  newDate = new Date().toISOString();
  caisse$ = new Compt();
  keyCaisse = '-NfT5iQCfBuB6phdf-3-';
  PortFaille$ = new Compt();
  keyPortfaille = '-NfT5oKXkAudPdrF8iYr';
  oper: Operation = new Operation();
  submitted = false;
  public _listOpration! :Operation[];
  public _idOpration!:number;
  OperationForm = this.builder.group({
    montant: this.builder.control('',  Validators.compose([Validators.pattern("^[0-9]*$")])),
    type: this.builder.control('', Validators.required),
  });

  oprations: Oprationtype[] = [
    { value: 'retrait', viewValue: 'سحب' },
    { value: 'versement', viewValue: 'ايداع' },

  ];




  caisseRef$ = this.dataService.caisseRef.snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })
      )
    )
  ).subscribe(data => {
    this.caisse$ = data[0] as Compt;
    //console.log(data);

  });


  portfailleRef$ = this.dataService.portfailleRef.snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })
      )
    )
  ).subscribe(data => {
    this.PortFaille$ = data[0] as Compt;
    //console.log(data);

  }
  );
 async getAllopeation(){
     var lisop!:Operation[];
     await this.getAlloperationFromFirbasse().then(
      res=>{
        lisop=res as Operation[];
      }
     );
     this._listOpration = lisop;
    // console.log(this._listOpration);
    this._idOpration = this._listOpration[this._listOpration.length -1].id + 1;
 }
getAlloperationFromFirbasse(){
  return new Promise((resolve,reject)=>{
    this.db.list('operations').valueChanges().subscribe(
      value=>{resolve(value);}
    )
  })
}

  saveOperation(): void {
    console.log(this.caisse$);
    console.log(this.PortFaille$);
    if (this.OperationForm.valid) {

      this.oper.id =this._idOpration;
      this.oper.montant = Number(this.OperationForm.value.montant);
      this.oper.type = this.OperationForm.value.type as string;
      this.oper.dateOp = this.newDate.toString();
      if (this.OperationForm.value.type == 'versement') {
        if (this.PortFaille$.solde >= Number(this.OperationForm.value.montant)) {
          //update caiss pour versement
          this.caisse$.lastSolde = this.caisse$.solde;
          this.caisse$.solde = this.caisse$.solde + Number(this.OperationForm.value.montant);
          this.caisse$.updateAt = new Date().toString();
          //update portfaille pour versment
          this.PortFaille$.lastSolde = this.PortFaille$.solde;
          this.PortFaille$.solde = this.PortFaille$.solde - Number(this.OperationForm.value.montant);
          this.PortFaille$.updateAt = new Date().toString();


          this.oper.color = 'text-info';
          this.oper.comptDest = 'CA001';
          this.oper.comptSource = 'PO001';

          if (this.dataService.createOperation(this.oper).then(() => {
            this.dataService.updateCaisse(this.keyCaisse, this.caisse$);
            this.dataService.updatePortfaille(this.keyPortfaille, this.PortFaille$);
            console.log('Created new item successfully!');
            this.submitted = true;
          })) {
            this.toast.success(String(this.OperationForm.value.montant), 'تم تسجيل العملية بنجاح');
            this.OperationForm.reset();
          }
          else {
            this.toast.error('العملية لم تسجل تأكد من المعطيات أو الانترنت');
          }

        } else {
          this.toast.error(String(this.OperationForm.value.montant), 'هذ المبلغ لايوجد في المحفظة');
        }

      } else {
        if (this.OperationForm.value.type == 'retrait') {
          if (this.caisse$.solde >= Number(this.OperationForm.value.montant)) {
            this.oper.color = 'text-danger';
            this.oper.comptSource = 'CA001';
            this.oper.comptDest = 'PO001';
            //update Caisse pour retrait
            this.caisse$.lastSolde = this.caisse$.solde;
            this.caisse$.solde = this.caisse$.solde - Number(this.OperationForm.value.montant);
            this.caisse$.updateAt = new Date().toString();
            //update portfaille pour retrait
            this.PortFaille$.lastSolde = this.PortFaille$.solde;
            this.PortFaille$.solde = this.PortFaille$.solde + Number(this.OperationForm.value.montant);
            this.PortFaille$.updateAt = new Date().toString();
            if (this.dataService.createOperation(this.oper).then(() => {
              this.dataService.updateCaisse(this.keyCaisse, this.caisse$);
              this.dataService.updatePortfaille(this.keyPortfaille, this.PortFaille$);
              console.log('Created new item successfully!');
              this.submitted = true;
            })) {
              this.toast.success(String(this.OperationForm.value.montant), 'تم تسجيل العملية بنجاح');
              this.OperationForm.reset();
            }
            else {
              this.toast.error('العملية لم تسجل تأكد من المعطيات أو الانترنت');
            }

          } else {
            this.toast.error(String(this.OperationForm.value.montant), 'هذ المبلغ لايوجد في الصندوق');
          }

        }
      }

      ;

    }

  }

  newOperation(): void {
    this.submitted = false;
    this.oper = new Operation();
  }




 
 // list operation

partList!: any[];
listPartAvecMoyenne: any;
dataSource: any;

@ViewChild(MatPaginator) paginator !: MatPaginator;
@ViewChild(MatSort) sort !: MatSort;
displayedColumns: string[] = ['id', 'type', 'montant', 'comptSource', 'comptDest', 'dateOp'];
tutorials: any;
currentTutorial = null;
currentIndex = -1;
title = '';
refreshList(): void {
  this.currentTutorial = null;
  this.currentIndex = -1;
  this.chargeAllOperation();
}
public _listOprationfiltrer! :Operation[];

chargeAllOperation(){
   this.dataService.getAllOperatio().snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
        
        ({ key: c.payload.key, ...c.payload.val() })
      ).filter(abj =>{return abj.type === 'retrait' || abj.type === 'versement' })
    )
  ).subscribe(data => {
    this.tutorials = data;
    //console.log(data);
   this.tutorials.sort((a:any, b:any) => (a.id > b.id) ? -1 : ((b.id > a.id) ? 1 : 0));
    this.dataSource = new MatTableDataSource(this.tutorials);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;



  });
}


//fin


}
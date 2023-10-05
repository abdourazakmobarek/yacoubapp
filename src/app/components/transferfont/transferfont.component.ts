import { Component } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from '@angular/fire/compat/database';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConnectionService } from 'ng-connection-service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { Compt } from 'src/app/model/compt.model';
import Operation from 'src/app/model/operation.model';
import { DataService } from 'src/app/services/data.service';
import { ServiceService } from 'src/app/services/service.service';
interface Oprationtype {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-transferfont',
  templateUrl: './transferfont.component.html',
  styleUrls: ['./transferfont.component.css']
})
export class TransferfontComponent {
  constructor(
    private service: ServiceService,
    private db: AngularFireDatabase,
    private connectionService: ConnectionService,
    private dataService: DataService,
    private router: Router, private toast: ToastrService,
    private builder: FormBuilder) {
    toast.toastrConfig.positionClass = 'toast-top-center';
    toast.toastrConfig.progressAnimation = 'decreasing';


  }
  ngOnInit(): void {
    this.getAllopeation();
  }
  isConnected = true;
  noInternetConnection!: boolean;


  newDate = new Date();
  caisse$ = new Compt();
  keyCaisse = '-NfT5iQCfBuB6phdf-3-';
  depot$ = new Compt();
  keyDepot = 'NfaP531kuyfRfibyCdb';
  PortFaille$ = new Compt();
  keyPortfaille = '-NfT5oKXkAudPdrF8iYr';
  bank$ = new Compt();
  keyBank = '-NfaNsakSRPQQ7A-tj4T';
  gain$ = new Compt();
  keyGain = '-NfaNsao12Bgub2nwH26';
  depanse$ = new Compt();
  keyDepanse = 'NfaP531kuyfRfibyCdb';
  oper: Operation = new Operation();
  submitted = false;
  public _listOpration!: Operation[];
  public _idOpration!: number;

  OperationForm = this.builder.group({
    montant: this.builder.control('',  Validators.compose([Validators.pattern("^[0-9]*$")])),
    comptSource: this.builder.control('', Validators.required),
    description: this.builder.control(''),
    ComptDest: this.builder.control('', Validators.required),
  });

  oprations: Oprationtype[] = [
    { value: 'CA001', viewValue: 'الصندوق' },
    { value: 'PO001', viewValue: 'المحفظة' },
    { value: 'BA001', viewValue: 'البنك' },
    { value: 'GA001', viewValue: 'الأرباح' },
    { value: 'DT001', viewValue: 'الودائع' },
    { value: 'DC001', viewValue: 'التفقات' },

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
  gainRef$ = this.dataService.depotRef.snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })
      )
    )
  ).subscribe(data => {
    this.depot$ = data[0] as Compt;
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
  }
  );
  bankRef$ = this.dataService.bankRef.snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })
      )
    )
  ).subscribe(data => {
    this.bank$ = data[0] as Compt;
    //console.log(data);

  }
  );
  depotRef$ = this.dataService.depotRef.snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })
      )
    )
  ).subscribe(data => {
    this.depot$ = data[0] as Compt;
    //console.log(data);

  }
  );
  depanseRef$ = this.dataService.depanseRef.snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })
      )
    )
  ).subscribe(data => {
    this.depanse$ = data[0] as Compt;
    //console.log(data);

  }
  );
  async getAllopeation() {
    var lisop!: Operation[];
    await this.getAlloperationFromFirbasse().then(
      res => {
        lisop = res as Operation[];
      }
    );
    this._listOpration = lisop;
    // console.log(this._listOpration);
    this._idOpration = this._listOpration[this._listOpration.length - 1].id + 1;
  }
  getAlloperationFromFirbasse() {
    return new Promise((resolve, reject) => {
      this.db.list('operations').valueChanges().subscribe(
        value => { resolve(value); }
      )
    })
  }
  dbPathDest = '';
  dbPathSource = '';
  comptSourceRef! : AngularFireList<Compt>;
  comptDestRef! :AngularFireList<Compt>;;
  
  comptSource = new Compt();
  keySource = '';
  comptDest = new Compt();
  keyDest = '';

  saveOperation() {
    this.connectionService.monitor().subscribe(isConnected => {
      if (isConnected.hasInternetAccess && this.OperationForm.valid) {
      
        switch (this.OperationForm.value.ComptDest) {
          case 'CA001': {this.dbPathDest = '/caisse'; this.comptDest = this.caisse$; this.keyDest = '-NfT5iQCfBuB6phdf-3-'; break; }
          case 'PO001': {this.dbPathDest = '/portfaille'; this.comptDest = this.PortFaille$; this.keyDest = '-NfT5oKXkAudPdrF8iYr'; break; }
          case 'BA001': {this.dbPathDest = '/bank'; this.comptDest = this.bank$; this.keyDest = '-NfaNsakSRPQQ7A-tj4T'; break; }
          case 'GA001': {this.dbPathDest = '/gain'; this.comptDest = this.gain$; this.keyDest = '-NfaNsao12Bgub2nwH26'; break; }
          case 'DT001': {this.dbPathDest = '/depot'; this.comptDest = this.depot$; this.keyDest = 'NfaP531kuyfRfibyCdb'; break; }
          case 'DC001': {this.dbPathDest = '/depanse'; this.comptDest = this.depanse$; this.keyDest = 'NfaP531kuyfRfibyCdb'; break; }
          default: break;
        }

        switch (this.OperationForm.value.comptSource) {
          case 'CA001': {this.dbPathSource='caisse'; this.comptSource = this.caisse$; this.keySource = '-NfT5iQCfBuB6phdf-3-'; break; }
          case 'PO001': {this.dbPathSource='portfaille'; this.comptSource = this.PortFaille$; this.keySource = '-NfT5oKXkAudPdrF8iYr'; break; }
          case 'BA001': {this.dbPathSource='bank'; this.comptSource = this.bank$; this.keySource = '-NfaNsakSRPQQ7A-tj4T'; break; }
          case 'GA001': {this.dbPathSource='gain'; this.comptSource = this.gain$; this.keySource = '-NfaNsao12Bgub2nwH26'; break; }
          case 'DT001': {this.dbPathSource='depot'; this.comptSource = this.depot$; this.keySource = 'NfaP531kuyfRfibyCdb'; break; }
          case 'DC001': {this.dbPathSource='depanse'; this.comptSource = this.depanse$; this.keySource = 'NfaP531kuyfRfibyCdb'; break; }
          default: break;
        }
        this.comptSourceRef = this.db.list(this.dbPathSource);
        this.comptDestRef = this.db.list(this.dbPathDest);
        this.noInternetConnection = false;
        this.oper.id = this._idOpration;
        this.oper.type='تحويل أرصدة'
        this.oper.dateOp = this.newDate.toString();
        this.oper.description = String(this.OperationForm.value.description);
        this.oper.montant = Number(this.OperationForm.value.montant);
        this.oper.comptDest = this.comptDest.id;
        this.oper.comptSource = this.comptSource.id;
        
        if(Number(this.comptSource.solde) >= Number(this.OperationForm.value.montant)){
           this.comptDest.lastSolde=this.comptDest.solde;
           this.comptDest.solde=Number(this.comptDest.solde) + Number(this.OperationForm.value.montant);
           this.comptDest.updateAt = this.newDate.toString();
           this.comptSource.lastSolde=this.comptSource.solde;
           this.comptSource.solde=Number(this.comptSource.solde) - Number(this.OperationForm.value.montant);
           this.comptSource.updateAt = this.newDate.toString();
           this.dataService.createOperation(this.oper).then(
            ()=>{
              this.dataService.updateCompt(this.keySource, this.comptSourceRef, this.comptSource).then(
                ()=>{
                  this.dataService.updateCompt(this.keyDest,this.comptDestRef,this.comptDest).then(
                    ()=>{
                      this.toast.success(String(this.OperationForm.value.montant),'تم تحويل الرصيد');
                      this.OperationForm.reset();
                    }
                  )
                  
                }
              )
            }
          );
        }
        else{
          this.toast.warning(String(this.OperationForm.value.montant),'هذ المبلغ غير متوفر في الحساب')
        }
        
      }
      else {
        this.noInternetConnection = true;

        this.toast.error(String(this.OperationForm.value.montant), 'تأكد من النت لم يتم تحويل الرصيد');

      }

      //end verser
    }

    );


  }
}

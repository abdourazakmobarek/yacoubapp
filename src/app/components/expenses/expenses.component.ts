import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConnectionService } from 'ng-connection-service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { Compt } from 'src/app/model/compt.model';
import Operation from 'src/app/model/operation.model';
import { DataService } from 'src/app/services/data.service';
interface Oprationtype {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  ngOnInit(): void {
    this.getAllopeation();
  }
  constructor(
    private db: AngularFireDatabase,
    private connectionService: ConnectionService,
    private dataService: DataService,
    private router: Router, private toast: ToastrService,
    private builder: FormBuilder
  ) {
    toast.toastrConfig.positionClass = 'toast-top-center';
    toast.toastrConfig.progressAnimation = 'decreasing';
  }
  isConnected = true;
  noInternetConnection!: boolean;


  newDate = new Date();
  caisse$ = new Compt();
  keyCaisse = '-NfT5iQCfBuB6phdf-3-';

  PortFaille$ = new Compt();
  keyPortfaille = '-NfT5oKXkAudPdrF8iYr';

  depanse$ = new Compt();
  keyDepanse = '-NfaNsanzsR-o86ibUUW';
  oper: Operation = new Operation();
  submitted = false;
  public _listOpration!: Operation[];
  public _idOpration!: number;

  OperationForm = this.builder.group({
    montant: this.builder.control('',  Validators.compose([Validators.pattern("^[0-9]*$")])),
    comptSource: this.builder.control('', Validators.required),
    description: this.builder.control(''),
    
  });

  oprations: Oprationtype[] = [
    { value: 'CA001', viewValue: 'الصندوق' },
    { value: 'PO001', viewValue: 'المحفظة' },


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
  saveDepance() {
    this.connectionService.monitor().subscribe(isConnected => {
      if (isConnected.hasInternetAccess && this.OperationForm.valid) {
        this.noInternetConnection = false;
        this.oper.id = this._idOpration;
        this.oper.type='نفقات'
        this.oper.dateOp = this.newDate.toString();
        this.oper.description = String(this.OperationForm.value.description);
        this.oper.comptDest = 'DC001';
        this.oper.montant = Number(this.OperationForm.value.montant);
        this.depanse$.lastSolde = this.depanse$.solde;
        this.depanse$.solde = Number(this.depanse$.solde) + Number(this.OperationForm.value.montant);
        this.depanse$.updateAt = this.newDate.toString();
        if(this.OperationForm.value.comptSource === 'CA001'){
         // console.log('compt source est le caisse');
          this.caisse$.lastSolde = this.caisse$.solde;
          this.caisse$.solde = Number(this.caisse$.solde) - Number(this.OperationForm.value.montant);
          this.caisse$.updateAt = this.newDate.toString();
          this.oper.comptSource= this.caisse$.id;
          if(Number(this.caisse$.solde) >= Number(this.OperationForm.value.montant)){
            this.dataService.createOperation(this.oper).then(
              ()=>{
                this.dataService.updateCaisse(this.keyCaisse, this.caisse$).then(
                  ()=>{
                    this.dataService.updateDepence(this.keyDepanse,this.depanse$).then(
                      ()=>{
                        this.toast.success(String(this.OperationForm.value.montant),'تم تسجيل النفقة');
                        this.OperationForm.reset();
                      }
                    )
                    
                  }
                )
              }
            );
          }else{
            this.toast.warning(String(this.OperationForm.value.montant),'هذ المبلغ غير متوفر في الصندوق');
          }
          

        }else{
          if(this.OperationForm.value.comptSource === 'PO001'){
            //console.log('compt source est le portfaille');
            this.PortFaille$.lastSolde = this.PortFaille$.solde;
            this.PortFaille$.solde = Number(this.PortFaille$.solde) - Number(this.OperationForm.value.montant);
            this.PortFaille$.updateAt = this.newDate.toString();
            this.oper.comptSource= this.PortFaille$.id;
            if(Number(this.PortFaille$.solde) >= Number(this.OperationForm.value.montant)){
              this.dataService.createOperation(this.oper).then(
                ()=>{
                  this.dataService.updatePortfaille(this.keyPortfaille, this.PortFaille$).then(
                    ()=>{
                      this.dataService.updateDepence(this.keyDepanse,this.depanse$).then(
                        ()=>{
                          this.toast.success(String(this.OperationForm.value.montant),'تم تسجيل النفقة');
                          this.OperationForm.reset();
                        }
                      )
                      
                    }
                  )
                }
              );
            }else{
              this.toast.warning(String(this.OperationForm.value.montant),'هذ المبلغ غير متوفر في المحفظة');
            }
            
            
          }
        }

      } else {
        this.noInternetConnection = true;

        this.toast.error(String(this.OperationForm.value.montant), 'تأكد من النت لم يتم تسجيل النفقة');

      }


    });

  }
}
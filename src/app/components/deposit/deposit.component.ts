import { Component,OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Compt } from 'src/app/model/compt.model';

import Operation from 'src/app/model/operation.model';
import { DataService } from 'src/app/services/data.service';
import { ServiceService } from 'src/app/services/service.service';
import {ConnectionService, ConnectionServiceModule} from 'ng-connection-service';
import { map } from 'rxjs';
interface Oprationtype {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit{
constructor(
  private service: ServiceService,
    private db:AngularFireDatabase,
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
  keyDepot= 'NfaP531kuyfRfibyCdb';
  PortFaille$ = new Compt();
  keyPortfaille = '-NfT5oKXkAudPdrF8iYr';
  bank$ = new Compt();
  keyBank= '-NfaNsakSRPQQ7A-tj4T';
  oper: Operation = new Operation();
  submitted = false;
  public _listOpration! :Operation[];
  public _idOpration!:number;
 
  OperationForm = this.builder.group({
    montant: this.builder.control('',  Validators.compose([Validators.pattern("^[0-9]*$")])),
    type: this.builder.control('', Validators.required),
    description: this.builder.control(''),
    comptSelected: this.builder.control(''),
  });

  oprations: Oprationtype[] = [
    { value: 'retrait', viewValue: 'سحب' },
    { value: 'versement', viewValue: 'ايداع' },

  ];
  selected = this.OperationForm.value.type;
  slectionChage = false;
  change(){
    if(this.OperationForm.value.type === 'retrait'){
      this.slectionChage =true;
      console.log(this.slectionChage);
    }else{
      this.slectionChage =false;
    }
    }
 

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
    //console.log(data);

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



  saveOperation(){
    this.connectionService.monitor().subscribe(isConnected => {      
      if (isConnected.hasInternetAccess && this.OperationForm.valid) { 
        this.noInternetConnection=false; 
        this.oper.id=this._idOpration;
        this.oper.dateOp = this.newDate.toString() ;
        this.oper.description =String( this.OperationForm.value.description) ;
        this.oper.montant = Number( this.OperationForm.value.montant);
        if(this.OperationForm.value.type === 'versement'){
          this.oper.type= 'وديعة';
          this.oper.color = 'text-warning';
          this.oper.comptDest = this.depot$.id;
          this.oper.comptSource = 'حساب خارجي';
          this.depot$.lastSolde = this.depot$.solde;
          this.depot$.solde = Number(this.depot$.solde) + Number( this.OperationForm.value.montant);
         
          this.bank$.lastSolde = Number(this.bank$.solde);
          this.bank$.solde = Number(this.bank$.solde) + Number( this.OperationForm.value.montant);
          this.dataService.createOperation(this.oper).then(
            ()=>{
              this.dataService.updateDepot(this.keyDepot, this.depot$).then(
                ()=>{
                  this.dataService.updateBank(this.keyBank, this.bank$).then(
                    ()=>{
                      this.toast.success(String(this.OperationForm.value.montant),'تم حفظ الوديعة');
                      this.OperationForm.reset();
                    }
                  );
                
                }
              );
            }
          );
        } 
        else{
          if(this.OperationForm.value.type === 'retrait'){
            this.oper.type= 'سحب وديعة';
            this.oper.color = 'text-secondary';
           this.oper.comptDest = 'صاحب الوديعة';
           this.oper.comptSource = String(this.OperationForm.value.comptSelected)+'|'+String(this.depot$.id);
           this.depot$.lastSolde = this.depot$.solde;
           this.depot$.solde = Number(this.depot$.solde) - Number( this.OperationForm.value.montant);
           if(this.OperationForm.value.comptSelected === 'CA001'){
             if(Number(this.caisse$.solde) >= Number(this.OperationForm.value.montant)){
              this.caisse$.lastSolde = this.caisse$.solde;
              this.caisse$.solde = Number(this.caisse$.solde) - Number( this.OperationForm.value.montant);
              this.dataService.createOperation(this.oper).then(
                ()=>{
                  this.dataService.updateDepot(this.keyDepot, this.depot$).then(
                    ()=>{
                      this.dataService.updateCaisse(this.keyCaisse,this.caisse$).then(
                        ()=>{
                          this.toast.success(String(this.OperationForm.value.montant),'تم سحب الوديعة من الصندوق');
                          this.OperationForm.reset();
                        }
                      )
                      
                    }
                  )
                }
              );
             }else{
              this.toast.warning(String(this.OperationForm.value.montant),'هذ المبلغ غير متفوفر في الصندوق');
             }
           }else{
           if(this.OperationForm.value.comptSelected === 'PO001'){
             if(Number(this.PortFaille$.solde) >= Number(this.OperationForm.value.montant)){
              this.PortFaille$.lastSolde = this.PortFaille$.solde;
              this.PortFaille$.solde = Number(this.PortFaille$.solde) - Number( this.OperationForm.value.montant);
              this.dataService.createOperation(this.oper).then(
                ()=>{
                  this.dataService.updateDepot(this.keyDepot, this.depot$).then(
                    ()=>{
                      this.dataService.updatePortfaille(this.keyPortfaille,this.PortFaille$).then(
                        ()=>{
                          this.toast.success(String(this.OperationForm.value.montant),'تم سحب الوديعة من المحفظة');
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
            
            
              console.log(this.OperationForm.value.comptSelected);
          }
        }
        
        }
        
        else {  
          this.noInternetConnection=true;  

        this.toast.error(String(this.OperationForm.value.montant),'تأكد من النت لم يتم حفظ الوديعة');
          
        }  

     //end verser
    }
    
    )  ;
    
  
  }

}





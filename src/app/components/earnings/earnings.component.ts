import { Component,OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { GlobaleCompt } from 'src/app/compts';
import { Compt } from 'src/app/model/compt.model';
import Operation from 'src/app/model/operation.model';
import { DataService } from 'src/app/services/data.service';
import { ServiceService } from 'src/app/services/service.service';
interface OprationValue {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.css']
})
export class EarningsComponent implements OnInit{

  constructor(
    private dataService:DataService,
    private service: ServiceService,
    private router: Router, private toast: ToastrService,
    private builder: FormBuilder) {
    toast.toastrConfig.positionClass = 'toast-top-center';
    toast.toastrConfig.progressAnimation = 'decreasing';
  }
  ngOnInit(): void {
    this.getAllopeation();
    this.chargeAllOperation();
  }
  oprations: OprationValue[] = [
    { value: 'retrait', viewValue: 'سحب' },
    { value: 'versement', viewValue: 'ايداع' },

  ];

  newDate = new Date();
  bank$ = new Compt();
  keyBank= '-NfaNsakSRPQQ7A-tj4T';
  PortFaille$ = new Compt();
  keyPortfaille = '-NfT5oKXkAudPdrF8iYr';
  gain$ = new Compt();
  keyGain = '-NfaNsao12Bgub2nwH26';
  oper: Operation = new Operation(); 
 public  _listOpration !: Operation[];
 public _idOpration! :number;
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
  gainRef$ = this.dataService.gainRef.snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })
      )
    )
  ).subscribe(data => {
    this.gain$ = data[0] as Compt;
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

  OperationForm = this.builder.group({
    montant: this.builder.control('',  Validators.compose([Validators.pattern("^[0-9]*$")])),
    type: this.builder.control(''),
  });
 
  



  async getAllopeation(){
    var lisop!:Operation[];
    await this.dataService.getAlloperationFromFirbasse().then(
     res=>{
       lisop=res as Operation[];
     }
    );
    this._listOpration = lisop;
   // console.log(this._listOpration);
   this._idOpration = Number(this._listOpration[this._listOpration.length -1].id )+ 1;
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
      ).filter(abj =>{return abj.type === 'gain'})
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








  saveOpeation(){
       if(this.OperationForm.valid){
          this.oper.type='gain';
          this.oper.color='text-success';
          this.oper.comptDest=this.gain$.id+'|'+this.bank$.id;
          this.oper.comptSource=this.PortFaille$.id;
          this.oper.dateOp =this.newDate.toString();
          this.oper.montant = Number(this.OperationForm.value.montant);
          this.oper.id= this._idOpration;
         
        if(Number(this.PortFaille$.solde) >= Number(this.OperationForm.value.montant)){
          this.bank$.lastSolde = this.bank$.solde;
          this.bank$.solde = Number(this.bank$.solde )+ Number(this.OperationForm.value.montant);
          this.bank$.updateAt = this.newDate.toString();

          this.PortFaille$.lastSolde = this.PortFaille$.solde;
          this.PortFaille$.solde = Number(this.PortFaille$.solde) - Number(this.OperationForm.value.montant);
          this.PortFaille$.updateAt = this.newDate.toString();

          this.gain$.lastSolde = this.gain$.solde;
          this.gain$.solde = Number(this.gain$.solde) + Number(this.OperationForm.value.montant);
          this.gain$.updateAt = this.newDate.toString();
          if(this.dataService.createOperation(this.oper).then(()=>{
            this.dataService.updateBank(this.keyBank, this.bank$);
            this.dataService.updatePortfaille(this.keyPortfaille, this.PortFaille$);
            this.dataService.updateGain(this.keyGain, this.gain$);
          })){
            this.toast.success(String(this.OperationForm.value.montant),'تم تسجيل الربح بنجاح');
            this.OperationForm.reset();
          }else{
            this.toast.error(String(this.OperationForm.value.montant),'لم يتم حفظ العملية رجاء تأكد من النت أو المدخلات');
          }
         
          
        }else{
          this.toast.warning(String(this.OperationForm.value.montant),'المبلغ غير موجود في المحفظة');
        }
       }
  }
}

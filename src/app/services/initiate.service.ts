import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { DataService } from './data.service';
import { Compt } from '../model/compt.model';
@Injectable({
  providedIn: 'root'
})
export class InitiateService {

  constructor( private dataservice:DataService) { }


 CreateCaisse(): void {
    let compt:Compt = new Compt();
    compt.id= 'CA001';
    compt.nomcompt='CAISSE';
    compt.solde= 0;
    compt.lastSolde= 0;
    compt.updateAt= new Date().toString();
    this.dataservice.createCaisse(compt).then(() => {
      console.log('Created new item successfully!');
     
    });
  }

  CreatePortFaille(): void {
    let compt:Compt = new Compt();
    compt.id= 'PO001';
    compt.solde= 0;
    compt.nomcompt='PORTFAILLE';
    compt.lastSolde= 0;
    compt.updateAt= new Date().toString();
    this.dataservice.createPortfaille(compt).then(() => {
      console.log('Created new item successfully!');
     
    });
  }
  

  CreateBank(): void {
    let compt:Compt = new Compt();
    compt.id= 'BA001';
    compt.solde= 0;
    compt.nomcompt='BANK';
    compt.lastSolde= 0;
    compt.updateAt= new Date().toString();
    this.dataservice.createBank(compt).then(() => {
      console.log('Created new item successfully!');
     
    });
  }
  CreateGain(): void {
    let compt:Compt = new Compt();
    compt.id= 'GA001';
    compt.solde= 0;
    compt.nomcompt='GAIN';
    compt.lastSolde= 0;
    compt.updateAt= new Date().toString();
    this.dataservice.createGain(compt).then(() => {
      console.log('Created new item successfully!');
     
    });
  }

  CreateDepot(): void {
    let compt:Compt = new Compt();
    compt.id= 'DT001';
    compt.solde= 0;
    compt.nomcompt='DEPOT';
    compt.lastSolde= 0;
    compt.updateAt= new Date().toString();
    this.dataservice.createDepot(compt).then(() => {
      console.log('Created new item successfully!');
     
    });
  }

  CreateDepance(): void {
    let compt:Compt = new Compt();
    compt.id= 'DC001';
    compt.solde= 0;
    compt.nomcompt='DEPENCE';
    compt.lastSolde= 0;
    compt.updateAt= new Date().toString();
    this.dataservice.createDepence(compt).then(() => {
      console.log('Created new item successfully!');
     
    });
  }

}

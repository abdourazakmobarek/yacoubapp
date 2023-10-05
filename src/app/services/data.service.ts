import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';


import { Observable, map } from 'rxjs';
import { Compt } from '../model/compt.model';
import Operation from '../model/operation.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private db:AngularFireDatabase) {
    this.operationsRef = db.list(this.dbPathOperation);
    this.caisseRef = db.list(this.dbPathCaisse);
    this.bankRef = db.list(this.dbPathBank);
    this.portfailleRef = db.list(this.dbPathPort);
    this.depanseRef = db.list(this.dbPathDepance);
    this.gainRef = db.list(this.dbPathGain);
    this.depotRef = db.list(this.dbPathDepot);
   }
   
   private dbPathOperation = '/operations';
   private dbPathCaisse = '/caisse';
   private dbPathPort = '/portfaille';
   private dbPathBank = '/bank';
   private dbPathDepance = '/depanse';
   private dbPathGain = '/gain';
   private dbPathDepot = '/depot';
   operationsRef: AngularFireList<Operation> ;
   caisseRef: AngularFireList<Compt> ;
   bankRef: AngularFireList<Compt> ;
   portfailleRef: AngularFireList<Compt> ;
   depanseRef: AngularFireList<Compt> ;
   gainRef: AngularFireList<Compt> ;
   depotRef: AngularFireList<Compt> ;
 
   updateCompt(key:string,ref:AngularFireList<Compt> , compt:any){
     return ref.update(key,compt);
     
  }
  saveOperation(ope:Operation){
    this.db.database.refFromURL('https://yacoub-project-default-rtdb.firebaseio.com/').child('operations').push(ope);

  }
 
getAlloperationFromFirbasse(){
 return new Promise((resolve,reject)=>{
   this.db.list('operations').valueChanges().subscribe(
     value=>{resolve(value);}
   )
 })
}
  getMessages(): Observable<any> {
    let messages = this.db.list('operations');
    return messages.valueChanges();
  }

  getAllOperatio() :AngularFireList<Operation>{ 
    return this.operationsRef;
  }
  createOperation(operatio: Operation): any {
    return this.operationsRef.push(operatio);
  }

  updateOperation(key: string, value: any): Promise<void> {
    return this.operationsRef.update(key, value);
  }

  deleteOperation(key: string): Promise<void> {
    return this.operationsRef.remove(key);
  }

// ciasse

  getCaisse():AngularFireList<Compt>{
    return this.caisseRef;
  }
   
  createCaisse(comp: Compt): any {
    return this.caisseRef.push(comp);
  }

  updateCaisse(key: string, value: any): Promise<void> {
    return this.caisseRef.update(key, value);
  }

  deleteCaisse(key: string): Promise<void> {
    return this.caisseRef.remove(key);
  }

  deleteAllCaisse(): Promise<void> {
    return this.caisseRef.remove();
  }

//portfaille
  getPortfaille():AngularFireList<Compt>{
    return this.portfailleRef;
  }

  createPortfaille(comp: Compt): any {
    return this.portfailleRef.push(comp);
  }

  updatePortfaille(key: string, value: any): Promise<void> {
    return this.portfailleRef.update(key, value);
  }

  deletePortfaille(key: string): Promise<void> {
    return this.portfailleRef.remove(key);
  }

  deleteAllPortfaille(): Promise<void> {
    return this.portfailleRef.remove();
  }
  
  //bank
  getBank():AngularFireList<Compt>{
    return this.bankRef;
  }
 
  createBank(comp: Compt): any {
    return this.bankRef.push(comp);
  }

  updateBank(key: string, value: any): Promise<void> {
    return this.bankRef.update(key, value);
  }

  deleteBank(key: string): Promise<void> {
    return this.bankRef.remove(key);
  }

  deleteAllBank(): Promise<void> {
    return this.bankRef.remove();
  }

  //gain
  getGain():AngularFireList<Compt>{
    return this.gainRef;
  }
  
  createGain(comp: Compt): any {
    return this.gainRef.push(comp);
  }

  updateGain(key: string, value: any): Promise<void> {
    return this.gainRef.update(key, value);
  }

  deleteGain(key: string): Promise<void> {
    return this.gainRef.remove(key);
  }

  deleteAllGain(): Promise<void> {
    return this.gainRef.remove();
  }
  //depot
  getDepot():AngularFireList<Compt>{
    return this.depotRef;
  }
  
  createDepot(comp: Compt): any {
    return this.depotRef.push(comp);
  }

  updateDepot(key: string, value: any): Promise<void> {
    return this.depotRef.update(key, value);
  }

  deleteDepot(key: string): Promise<void> {
    return this.depotRef.remove(key);
  }

  deleteAllDepot(): Promise<void> {
    return this.depotRef.remove();
  }
  //depanse
  getDepence():AngularFireList<Compt>{
    return this.depanseRef;
  }
 
  createDepence(comp: Compt): any {
    return this.depanseRef.push(comp);
  }

  updateDepence(key: string, value: any): Promise<void> {
    return this.depanseRef.update(key, value);
  }

  deleteDepence(key: string): Promise<void> {
    return this.depanseRef.remove(key);
  }

  deleteAllDepence(): Promise<void> {
    return this.depanseRef.remove();
  }

}

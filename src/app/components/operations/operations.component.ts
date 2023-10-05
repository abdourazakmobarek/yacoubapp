import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { type } from 'ngx-bootstrap-icons';
import { Observable, map } from 'rxjs';
import Operation from 'src/app/model/operation.model';
import { DataService } from 'src/app/services/data.service';
import { ServiceService } from 'src/app/services/service.service';
import { getDatabase, ref, onValue } from "firebase/database";
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit{
  constructor(
    
    private db:AngularFireDatabase,
    private service:ServiceService,
     private dataservice:DataService){
      
     }
  ngOnInit(): void {
    
    this.service.Autorefresh.subscribe(
      res=>{
        this.getAllopeation();
       // this.chargeAllOperation();
      }
    ); 
   // this.chargeAllOperation();
    this.getAllopeation();
   
  }
 
  partList!: any[];
  listPartAvecMoyenne: any;
  dataSource: any;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  displayedColumns: string[] = ['id', 'type', 'montant', 'comptSource', 'comptDest', 'dateOp','description'];
  tutorials: any;
  currentTutorial = null;
  currentIndex = -1;
  title = '';
  refreshList(): void {
    this.currentTutorial = null;
    this.currentIndex = -1;
    this.chargeAllOperation();
  }
  public _listOpration! :Operation[];
  myControl = new FormControl('');
  searchKey ='';
 
  

  applyFilter(event:any){
   
    this.dataSource.filter =event.target.value;
  }
  chargeAllOperation(){
     this.dataservice.getAllOperatio().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.tutorials = data;
      //console.log(data);
    // this.tutorials.sort((a:any, b:any) => (a.id > b.id) ? -1 : ((b.id > a.id) ? 1 : 0));
      this.dataSource = new MatTableDataSource(this.tutorials);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;


  
    });
  }
  async getAllopeation(){
    var lisop!:Operation[];
    await this.getAlloperationFromFirbasse().then(
     res=>{
       lisop=res as Operation[];
     }
    );
    this._listOpration = lisop;
   // console.log(this._listOpration);
   this.tutorials = this._listOpration;
   //console.log(data);
  this.tutorials.sort((a:any, b:any) => (a.id > b.id) ? -1 : ((b.id > a.id) ? 1 : 0));
   this.dataSource = new MatTableDataSource(this.tutorials);
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
   
}
getAlloperationFromFirbasse(){
 return new Promise((resolve,reject)=>{
   this.db.list('operations', ref=>ref.orderByChild('dateOp')).valueChanges().subscribe(
     value=>{resolve(value);}
   )
 })
}


//export pdf
 db1 = getDatabase();



//fin test connection
pipe!: DatePipe;
filterForm = new FormGroup({
  fromDate: new FormControl(''),
  toDate: new FormControl(''),
});

get fromDate() {
   return this.filterForm.get('fromDate')?.value;
   }
get toDate() { return this.filterForm.get('toDate')?.value; } 

applyFiltery() {
  
 // console.log('this.fromDate.');
 // console.log(this.dataSource);
 this.pipe = new DatePipe('en');
    let datedebut = this.pipe.transform(this.fromDate, 'yyyy-MM-dd')?.replace('-',"").replace('-',"");
  let datefin = this.pipe.transform(this.toDate, 'yyyy-MM-dd')?.trim().replace('-',"").replace('-',"");
 
  
  /* this.dataSource.filterPredicate = (data:Operation, filter:any) =>{
    if (this.fromDate && this.toDate) {
      return data.dateOp >= this.fromDate && data.dateOp <= this.toDate;
    }
    return true;
  } */
  this.dataSource.filterPredicate = (data:Operation, filter:any) =>{
    if (datedebut && datefin) {
      let y = this.pipe.transform(data.dateOp, 'yyyy-MM-dd')?.replace('-',"");
      let x = y?.replace('-',"");
      //console.log('x= '+x);
      return  Number(x!)  >= Number(datedebut) && Number(x!) <= Number(datefin);
    }
    return true;
  }
  this.dataSource.filter = ''+Math.random();
}

}

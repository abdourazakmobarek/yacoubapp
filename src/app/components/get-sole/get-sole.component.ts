import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { Compt } from 'src/app/model/compt.model';
import { DataService } from 'src/app/services/data.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-get-sole',
  templateUrl: './get-sole.component.html',
  styleUrls: ['./get-sole.component.css']
})
export class GetSoleComponent implements OnInit {
  constructor(
    private builder: FormBuilder, 
    private router: Router, 
    private service: ServiceService,
    private dataservice:DataService) {

  }
 
  ngOnInit(): void {
   
   /*  this. getSoldes();
    this.service.Autorefresh.subscribe(
      respo=>{
        this.getSoldes();
      }
    ) */
    this.getPort();
    this.getCaisee();
    this.getBank();
    this.getGainSolde();
    this.getDepotSolde();
    this.getDepenseSolde();
   /*  this.service.Autorefresh.subscribe(
      respo=>{
        this.getCaisee();
      }
    ); */
  }

  soldeCaisse$: any;
  soldeBank$: any;
  soldePortf$: any;
  soldegain$: any;
  soldeDepnse$: any;
  soldepot$: any;

getCaisee(){
 return this.dataservice.getCaisse().snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })
      )
    )
  ).subscribe(data => {
    this.soldeCaisse$ = data[0].solde;
    //console.log(data);
    
  });
}
getPort(){
  this.dataservice.getPortfaille().snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })
      )
    )
  ).subscribe(data => {
    this.soldePortf$ = data[0].solde;
   // console.log(data);
    
  });
}

getBank(){
  this.dataservice.getBank().snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })
      )
    )
  ).subscribe(data => {
    this.soldeBank$ = data[0].solde;
   // console.log(data);
    
  });
}

getGainSolde(){
  this.dataservice.getGain().snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })
      )
    )
  ).subscribe(data => {
    this.soldegain$ = data[0].solde;
   // console.log(data);
    
  });
}
getDepotSolde(){
  this.dataservice.getDepot().snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })
      )
    )
  ).subscribe(data => {
    this.soldepot$ = data[0].solde;
   // console.log(data);
    
  });
}
getDepenseSolde(){
  this.dataservice.getDepence().snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })
      )
    )
  ).subscribe(data => {
    this.soldeDepnse$ = data[0].solde;
   // console.log(data);
    
  });
}


 
}

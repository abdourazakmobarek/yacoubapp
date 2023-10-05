import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import { Compt } from 'src/app/model/compt.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private builder: FormBuilder, private router: Router, private service: ServiceService) { }
  ngOnInit(): void {
    /* this.service.GetByCode('BA001').pipe().subscribe(res => {
      let compt: Compt;
      compt = res as Compt;
      this.soldeBank = compt.solde;

    });
    this.service.GetByCode('CA001').pipe().subscribe(res => {
      let compt: Compt;
      compt = res as Compt;
      this.soldeCaisse = compt.solde;

    });
    this.service.GetByCode('PO001').pipe().subscribe(res => {
      let compt: Compt;
      compt = res as Compt;
      this.soldePortf = compt.solde;

    });
 */


  }
  soldeCaisse?: any;
  soldeBank?: any;
  soldePortf?: any;


  getSode(compt: string):number {
    let comptCharge!:Compt;
    this.service.GetByCode(compt).pipe().subscribe(
      res =>{
        comptCharge = res as Compt;
        return comptCharge.solde;
      }
    )
    return comptCharge.solde;
  }


  operationForm = this.builder.group({
    email: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  });

  versement(comptSource: string, comptDest: string) {
    console.log(comptDest + ' ' + comptSource);
  }

  myObservable = of(1, 2, 3);

  // Create observer object
  myObserver = {
    next: (x: number) =>{
      console.log('Observer got a next value: ' + x);
      this.soldeBank = this.soldeBank  + x;
    },
    error: (err: Error) => console.error('Observer got an error: ' + err),
    complete: () => console.log('Observer got a complete notification'),
  };


  procedOpration() {

       console.log()
       // Execute with the observer object
       this.myObservable.subscribe(this.myObserver);

  }
}

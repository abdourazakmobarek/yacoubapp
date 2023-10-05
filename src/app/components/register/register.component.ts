import { Component,OnInit } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/material/user.module';
import { ServiceService } from 'src/app/services/service.service';
import { FormGroup } from '@angular/forms'; 
import { DataService } from 'src/app/services/data.service';
import { map } from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  constructor(){

  }
    ngOnInit(): void {
      
    }
    

 

    /* regisrtForm = this.builder.group({
      email: this.builder.control('', Validators.required),
      password: this.builder.control('', Validators.required),
    }); */
    
    register(){
      
           
    }
}

import { Component,OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, map } from 'rxjs';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  constructor(private authservcie:ServiceService,private auth:AngularFireAuth,){}
  displayName$! : any ;
  ngOnInit(): void {
    
   this.auth.authState.pipe(map(user =>{
    this.displayName$ = user?.email;
    
  }));
  console.log(this.displayName$);
  }
 
  logout(){
    this.authservcie.logout();
  }
}

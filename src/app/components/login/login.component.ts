import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

constructor(private builder:FormBuilder,private router: Router,private service:ServiceService ){

}
  ngOnInit(): void {
    if (this.service.isLoggedIn) {
      this.router.navigate(['/admin']);
    }
  }
  LoginForm = this.builder.group({
    email: this.builder.control('', [Validators.required,Validators.email]),
    password: this.builder.control('', [Validators.required]),
  });
  procedLogin(){
    this.adressmail = this.LoginForm.value.email as string;
    this.passwordd= this.LoginForm.value.password as string;
    this.service.login(this.adressmail,this.passwordd);
   // this.router.navigate(['admin']);
  // console.log(this.adressmail);
  }
  adressmail:string ='';
  passwordd:string = '';
  register(){
    this.adressmail = this.LoginForm.value.email as string;
  this.passwordd= this.LoginForm.value.password as string;
    // if(this.regisrtForm.valid){
     console.log(this.adressmail);
     
    this.service.register(this.adressmail,this.passwordd);

     
}
}

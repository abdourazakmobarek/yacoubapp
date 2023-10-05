import { Injectable,inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject, forkJoin, map, tap } from 'rxjs';
import { Compt } from '../model/compt.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../material/user.module';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private dataservice:DataService, private router:Router ,private http: HttpClient,private auth:AngularFireAuth,private toast:ToastrService) { }
  urlApi = 'http://localhost:3000/compt';
  urlOper = 'http://localhost:3000/operations';
  
  
  authState$ :Observable<any> = this.auth.authState;
 displayName$ :Observable<string> =  this.authState$.pipe(
  map(user=>{
    return !user ? null : user.displayName;
  })
) ;


  private _autrefresh = new Subject<void>();
  get Autorefresh() {
    return this._autrefresh;
  }
login(email:string,password:string){
  this.auth.signInWithEmailAndPassword(email,password)
  .then((user)=>{
    console.log(user.user?.email);
    localStorage.setItem('user',JSON.stringify(user.user));
    this.toast.success('login Success');
    this.router.navigate(['admin']);
  },
  err=>{
    this.toast.error('fail to login');
    this.router.navigate(['/']);
  }
  )
}
get isLoggedIn(): boolean {
  const user = JSON.parse(localStorage.getItem('user')!);
  return user !== null && user.email!== false ? true : false;
}
logout(){
  this.auth.signOut().then(
    ()=>{
      localStorage.removeItem('user');
      this.router.navigate(['']);
    }
  );
 
}

register(email:string,password:string){
  this.auth.createUserWithEmailAndPassword(email,password).then(
    ()=>{
      this.toast.success('user createdd Success');
    this.router.navigate(['admin']);
    },
    err=>{
      this.toast.error('fail to register');
      this.router.navigate(['register']);
    })

}

  getATowCompts(c1:any,c2:any): Observable<Compt[]> {
    return forkJoin([
      this.http.get(this.urlApi+'/'+c1),
      this.http.get(this.urlApi+'/'+c2),
     
    ]).pipe(
      map((data: any) => {
        let respose: any = data;    
        return respose;
      })
    );
  }
  getThreeCompts(c1:any,c2:any,c3:any): Observable<Compt[]> {
    return forkJoin([
      this.http.get(this.urlApi+'/'+c1),
      this.http.get(this.urlApi+'/'+c2),
      this.http.get(this.urlApi+'/'+c3),
     
    ]).pipe(
      map((data: any) => {
        let respose: any = data;    
        return respose;
      })
    );
  }
  getFourCompts(c1:any,c2:any,c3:any,c4:any): Observable<Compt[]> {
    return forkJoin([
      this.http.get(this.urlApi+'/'+c1),
      this.http.get(this.urlApi+'/'+c2),
      this.http.get(this.urlApi+'/'+c3),
      this.http.get(this.urlApi+'/'+c4),
     
    ]).pipe(
      map((data: any) => {
        let respose: any = data;    
        return respose;
      })
    );
  }

  GetByCode(code: string): Observable<Compt> {
    return this.http.get<Compt>(this.urlApi + '/' + code);
  }


  UpdateCompt(inputData: any, code: any) {
    return this.http.put(this.urlApi + '/' + code, inputData).pipe(
    ).subscribe(
      res => {
        this.Autorefresh.next();
        return res;
      },
      erroro => {
        return { 'error': erroro }
      }
    );
  }

  getAllOeration(): Observable<object> {
    return this.http.get(this.urlOper);
  }
  saveOpration(inputData: any) {

    this.dataservice.saveOperation(inputData);
   /*  return this.http.post(this.urlOper, inputData).pipe(
      tap(() => {
        this.Autorefresh.next();
      })
    ); */
   this.dataservice.getMessages().subscribe(
    res=>{
      console.log(res);
    }
   );
  }
}

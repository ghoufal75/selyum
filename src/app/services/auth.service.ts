import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, tap } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({providedIn : 'root'})
export class AuthenticationService{
    userEmitter : BehaviorSubject<any> = new BehaviorSubject(null);
    API_URL = environment.api;
    URI =  '/auth';
    constructor(private http : HttpClient){}
    signIn(user){
        return this.http.post(this.API_URL+this.URI+"/signIn",user).pipe(tap(res=>{
            this.userEmitter.next(res);
            localStorage.setItem("connectedUser",JSON.stringify(res));
        }))
    }
    signOut(){

    }
    signUp(user:any){
        return this.http.post(this.API_URL+this.URI+'/signUp',user)
    }
}

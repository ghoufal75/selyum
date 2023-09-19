import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {switchMap, take } from "rxjs/operators";
import { AuthenticationService } from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(private authService:AuthenticationService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("interceptor is working");
    if(req.url.includes('admin/signup')){
      return next.handle(req);
    }
    else{

     return this.authService.userEmitter.pipe(take(1),switchMap(user=>{

      if(!user){
        console.log("there is no user");
        return next.handle(req);
      }
      else{
        let httpHeader={'Authorization': `Bearer ${user.token}`}
        const newReq=req.clone({setHeaders:httpHeader})
        return next.handle(newReq);
      }
    }))
  }
  }
}

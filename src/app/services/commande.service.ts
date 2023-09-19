import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({providedIn : 'root'})
export class CommandeService{
    readonly API_URL = environment.api;
    readonly URI = "/commande";
    constructor(private http : HttpClient){}

    getCommandes(){
        return this.http.get(this.API_URL+this.URI);
    }

    validateLivraison(client,id,dateLivraison){
        let params = new HttpParams().append('id',id);
        return this.http.post(this.API_URL+this.URI+'/livrer',{client,date:dateLivraison},{params})
    }

}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({providedIn : 'root'})
export class PanierService{
    panier = [];
    API_URL = environment.api;
    panierEmitter : BehaviorSubject<any[]> = new BehaviorSubject<any>(null);
    constructor(private http:HttpClient){

    }
    updatePanier(panier){
        this.panier = panier;
        localStorage.setItem('panier',JSON.stringify(this.panier));
        this.emitPanier();
    }
    emitPanier(){
        this.panierEmitter.next(this.panier);
    }

    passerCommande(){
        // console.log("Panier: ",this.panier);
        return this.http.post(this.API_URL+'/commande',{produits : this.panier});
    }
}

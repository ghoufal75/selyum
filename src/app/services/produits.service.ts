import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({providedIn : 'root'})
export class ProduitService{
    readonly API_URL = environment.api;
    readonly URI = "/produit";
    constructor(private http : HttpClient){}
    addProduit(nom,prix,stock,categorie,imgUrls){
        return this.http.post(this.API_URL+this.URI,{nom,prix,stock,categorie,imgUrls});
    }

    getProducts(){
        return this.http.get(this.API_URL+this.URI);
    }

    getProductsByCategorie(idCat){
        return this.http.get(this.API_URL+this.URI+`/categorie/${idCat}`);
    }

    getProductsByInterval(categorieId,min,max){
        console.log("Max : ",max);
        console.log("Min : ",min);
        let params = new HttpParams();
        params = params.append('max',max);
        params = params.append('min',min);
        params = params.append('categorieId',categorieId);
        return this.http.get(this.API_URL+this.URI+`/interval/price`,{params})
    }

    getTypes(){
        return this.http.get(this.API_URL+'/produitType');
    }

    updateCatgeorie(id,data){
        let newData={...data,type:data.idType};
        delete newData.idType;
        return this.http.patch(this.API_URL+this.URI+`/${id}`,newData);
    }

    deleteProduit(id){
        return this.http.delete(this.API_URL+this.URI+`/${id}`);
    }




}

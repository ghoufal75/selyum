import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({providedIn : 'root'})
export class CategorieService{
    readonly API_URL = environment.api;
    readonly URI = "/produitCategorie";
    constructor(private http : HttpClient){}
    addCategorie(nom,id){
        return this.http.post(this.API_URL+this.URI,{nom,idType:id});
    }

    getCategories(){
        return this.http.get(this.API_URL+this.URI);
    }

    getCategorieByType(id){
        return this.http.get(this.API_URL+this.URI+`/type/${id}`)
    }

    getTypes(){
        return this.http.get(this.API_URL+'/produitType');
    }

    updateCatgeorie(id,data){
        let newData={...data,type:data.idType};
        delete newData.idType;
        return this.http.patch(this.API_URL+this.URI+`/${id}`,newData);
    }

    deleteCategorie(id){
        return this.http.delete(this.API_URL+this.URI+`/${id}`);
    }




}

import { Component, OnInit } from '@angular/core';
import { CommandeService } from 'src/app/services/commande.service';
import { Commande } from './commade.interface';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.scss']
})
export class CommandeComponent implements OnInit{
  commandeList : Commande[] = [];
  isLoading = false;
  dateLivraison = null;
  constructor(private commandeService : CommandeService){}
  ngOnInit(): void {
      this.commandeService.getCommandes().subscribe((res:any)=>{
        console.log("Commandes : ",res);
        this.commandeList = res;
      })
  }

  getTotal(index:number){
    let total = 0;
    for(let el of this.commandeList[index].produits){
      total+=el.quantity*el.product.prix;
    }
    return total;
  }

  validateLivraison(client,id){
      this.commandeService.validateLivraison(client,id,new Date().toISOString()).subscribe((res)=>{
        console.log("Validated.");
      })
  }
}

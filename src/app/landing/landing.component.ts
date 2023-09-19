import { Component } from '@angular/core';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  constructor(private panierService : PanierService){
    let panier = JSON.parse(localStorage.getItem('panier')!);
    console.log("Here is panier : ",panier );
    if(panier){
      this.panierService.updatePanier(panier);
    }
    else{
      this.panierService.updatePanier([]);
    }

    this.panierService.emitPanier();
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandeComponent } from './commande.component';
import { CommandeRoutingModule } from './commande-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    CommandeComponent
  ],
  imports: [
    CommonModule,
    CommandeRoutingModule,
    SharedModule
  ]
})
export class CommandeModule { }

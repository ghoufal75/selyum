import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableauDeBordComponent } from './tableau-de-bord.component';
import { TableauDeBordRoutingModule } from './tableau-de-bord-routing.module';
import { NgApexchartsModule } from 'ng-apexcharts';



@NgModule({
  declarations: [
    TableauDeBordComponent
  ],
  imports: [
    CommonModule,
    TableauDeBordRoutingModule,
    NgApexchartsModule
  ]
})
export class TableauDeBordModule { }

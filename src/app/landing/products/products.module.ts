import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    NgbModalModule,
    FormsModule,
    SharedModule
  ]
})
export class ProductsModule { }

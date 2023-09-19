import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { Router, RouterModule } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    HeaderComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModalModule,
  ],
  exports : [HeaderComponent,LoaderComponent]
})
export class SharedModule { }

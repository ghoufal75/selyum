import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { DashboardRoutingModule } from './dashboard-routing.module';



@NgModule({
  declarations: [
    TopBarComponent,
    SideBarComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,

  ]
})
export class DashboardModule { }

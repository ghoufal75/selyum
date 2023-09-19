import { trigger,transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { SideBarService } from '../services/sideBar.service';
import { menu_data } from './menu.data';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isShownSideBar : boolean = true;

  connectedRole:string="";
  allowedRoutes = [];
  menuData=menu_data;

  constructor(private router : Router,

    private activatedRoute : ActivatedRoute,private sideBarService : SideBarService,
    // private authService : AuthService
    ){

  }
  ngOnInit(){
    console.log("Allowed routes : ",this.allowedRoutes);
    // this.router.navigateByUrl(this.allowedRoutes[0].route);
    this.trackSideBarStatus();
    this.sideBarService.emitSideBarState();
  }

  trackSideBarStatus(){
    this.sideBarService.sideBarStateSubject.subscribe(data=>{
      this.isShownSideBar = data
    });
  }

  toggleBar(){
    this.sideBarService.toggleSideBar();
  }
}

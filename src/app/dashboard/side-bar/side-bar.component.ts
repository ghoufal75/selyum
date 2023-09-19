import { trigger, transition, style, animate } from '@angular/animations';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

import { SideBarService } from 'src/app/services/sideBar.service';
import { menu_data } from '../menu.data';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  animations : [
    trigger('appear',[
      transition(':enter',[
        style({opacity: 0,transform : 'translateX(-50%)'}),
        animate("200ms",style({opacity: 1,'transform' : 'translateX(0)'}))
      ]),
      transition(':leave',[
        style({opacity: 1,transform : 'translateX(0)'}),
        animate("200ms",style({opacity: 0,'transform' : 'translateX(-50%)'}))
      ])
    ])
  ]

})
export class SideBarComponent implements OnInit, AfterViewInit{
  isShownSideBar = true;
  menuData=menu_data;
  // user : User;
  @Input() role : string;
  allowedRoutes=[];
  constructor(private router : Router,private sideBarService : SideBarService,
    // private authService : AuthService
    ){
  }
  ngOnInit(){
    this.trackSideBarStatus();
    this.sideBarService.emitSideBarState();
  }

  trackSideBarStatus(){
    this.sideBarService.sideBarStateSubject.subscribe(data=>{
      this.isShownSideBar = data;
    });
  }

  ngAfterViewInit(){

  }

  // getRight(route){
  //   return route.roles.includes(this.role);
  // }
}

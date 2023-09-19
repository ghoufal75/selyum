import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { SideBarService } from 'src/app/services/sideBar.service';
enum ShownMenu {
  notifications = "notifications",
  messages = "messages",
  settings = "settings",
}
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  animations : [
    trigger('appear',[
      transition(':enter',[
        style({opacity : 0}),
        animate('300ms',style({opacity : 1}))
      ]),
      transition(':leave',[
        style({opacity : 1}),
        animate('300ms',style({opacity : 0}))
      ]),
    ])
  ]
})

export class TopBarComponent implements OnInit {
  isShownSideBar:boolean;
  shownMenu :ShownMenu | null | string= null;
  @Output() toggleSideBar : EventEmitter<boolean> = new EventEmitter<boolean>();
  paddingValue="5.58rem";
  @ViewChild('menu') menu : ElementRef;


  constructor(
    // private navService : NavService,
    private sideBarService : SideBarService,
    // private authService : AuthService,
    private router: Router){}
  ngOnInit(){
    this.trackSideBarStatus();
    this.sideBarService.emitSideBarState();
    if(window.innerWidth<=1232){
      this.paddingValue='9.3rem';
    }
    if(window.innerWidth<=663){
      this.paddingValue='10.54rem';
    }
  }

  trackSideBarStatus(){
    this.sideBarService.sideBarStateSubject.subscribe(data=>{
      this.isShownSideBar = data
    });
  }

  toggleBar(){
    this.sideBarService.toggleSideBar();
  }


  @HostListener("window:resize") onResize(){
    if(window.innerWidth>1232){
      this.paddingValue='5.58rem';
    }
    if(window.innerWidth<=1232){
      this.paddingValue='5.766rem';
    }
    if(window.innerWidth<=663){
      this.paddingValue='10.54rem';
    }
  }

  @HostListener("window:click",['$event']) onWindowClick(e:any){
    if(this.menu && !this.menu.nativeElement.contains(e.target)){
      console.log("hh");
      this.shownMenu = null;
    }
  }

  showMenu(item : ShownMenu | string){
    setTimeout(()=>{
      if(this.shownMenu == item){
        this.shownMenu = null;
        return;
      }
      this.shownMenu = item;
    },2)

  }
  signout(){
    localStorage.removeItem('role');
    // this.navService.connectedRole.next(null);
    this.router.navigateByUrl('/fr');
    // this.authService.signout().subscribe({
    //   error : (err) => console.log(err),
    //   next : (res)=>{this.router.navigateByUrl('/authentication')}
    // });
  }
}

import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isTransaprent = false;
constructor(private router : Router){
  if(this.router.url.includes('main')){
    this.isTransaprent = true;
  }
  else{
    this.isTransaprent = false;
  }
  this.router.events.subscribe((ev:any)=>{
    if(ev instanceof NavigationEnd){
      if(this.router.url.includes('main')){
        this.isTransaprent = true;
      }
      else{
        this.isTransaprent = false;
      }
    }
  })
}
checkTransparency(){
  if(this.isTransaprent){
    return 'transparent';
  }
  return 'rgb(0,0,0)';
}
}

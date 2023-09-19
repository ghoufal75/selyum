import { trigger, transition, style, animate } from '@angular/animations';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/auth.service';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
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
export class HeaderComponent implements OnInit{
  isTransaprent = false;
  isPanierShown = false;
  @ViewChild('menu') menu : ElementRef;
  @ViewChild('btnPanier') btnPanier : ElementRef;
  panierItems : any[]= [];
  currentTotal = 0;
  success=false;
  formIsField = false;

constructor(private authService : AuthenticationService,private modalService : NgbModal,private panierService : PanierService,private router : Router){
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

ngOnInit(): void {
    this.panierService.panierEmitter.subscribe((res:any)=>{
      this.panierItems = res;
    })
}

@HostListener("window:click",['$event']) onWindowClick(e:any){
  if(this.menu && !this.menu.nativeElement.contains(e.target) && !this.btnPanier.nativeElement.contains(e.target)){
    this.isPanierShown = false;
  }
}
togglePanier(){
  this.isPanierShown = !this.isPanierShown;
}
checkTransparency(){
  if(this.isTransaprent){
    return 'transparent';
  }
  return 'rgb(0,0,0)';
}

getTotal(){
  let total = 0;
  for(let el of this.panierItems){
    total+=el.quantity*el.product.prix;
  }
  this.currentTotal = total;
  return total;
}

showModal(modal){
  this.modalService.open(modal,{centered : true,size : "md"});
}
processCheckout(modal){
  this.authService.userEmitter.pipe(take(1)).subscribe(res=>{
    if(res){
      if(this.formIsField){
        this.panierService.passerCommande()
        .subscribe(result=>{
          this.modalService.dismissAll();
          this.success = true;
          this.formIsField = false;
          setTimeout(()=>{
            this.success = false;
          },2500);
          console.log(result);
        })
      }
      else{
        console.log("Testing");
        this.showModal(modal);
      }

    }
    else{
      this.router.navigateByUrl('/auth');
    }
  })
}

fillForm(){
  this.formIsField = true;
  this.processCheckout(null);
}
}

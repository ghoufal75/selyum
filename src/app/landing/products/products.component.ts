import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/Models/product.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { PanierService } from 'src/app/services/panier.service';
import { ProduitService } from 'src/app/services/produits.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  typeList = [];
  categorieList :any[];
  type = "";
  categorieForm : FormGroup;
  isLoading = false;
  products : Product [] = [];
  currentCategorie = null;
  priceMax = null;
  priceMin = null;
  panierItems : any[] = [];
  productToAddToPanier : any | null= null;
  quantityToAddToPanier : any | null= null;
  currentTotal = 0;

  constructor(private panierService : PanierService, private modalService : NgbModal,private route : ActivatedRoute,private productService : ProduitService,private categorieService : CategorieService){}


  ngOnInit(): void {
    this.isLoading = true;
    this.getTypes();
    this.type = this.route.snapshot.params['type'];
    this.route.paramMap.subscribe(el=>{
      this.type = <string> el.get('type');
      this.getTypes();
    });
    this.initForm();

  }

  getTotal(){
    let total = 0;
    for(let el of this.panierItems){
      total+=el.quantity*el.product.prix;
    }
    this.currentTotal = total;
    return total;
  }
  pickQuantity(modal,product){
    let prod;
    if(this.panierItems){
       prod = this.panierItems.find(el=>el.product.nom==product.nom);

    }
    if(!prod){
      this.panierItems.push({product : product,quantity : 1});
    }
    else{
      prod.quantity+=1;
    }
    this.panierService.updatePanier(this.panierItems);
    this.showModal(modal);
  }
  removeItem(index){
    this.panierItems.splice(index,1);
    this.panierService.updatePanier(this.panierItems);
  }


  getCategories(){
    let typeHelper = this.typeList.find((el:any)=>el!.nom==this.type);
    console.log("typeHelper : ",typeHelper);
    this.categorieService.getCategorieByType(typeHelper!['_id']).subscribe((res:any)=>{
      this.currentCategorie = res[0]._id ;
      this.categorieList = res;
      this.searchProducts(res[0]._id);
      this.panierService.panierEmitter.subscribe((panier)=>{
        this.panierItems = panier;
      })
    })
  }

  showModal(modal){
    this.modalService.open(modal,{centered : true,size : "md"});
  }

  searchProducts(id?){
    let categorieId = id;
    this.isLoading = true;
    if(!categorieId){
      categorieId = this.categorieForm.get("categorie")!.value;
    }
    this.currentCategorie = categorieId;
    this.productService.getProductsByCategorie(categorieId).subscribe((res:any)=>{
        console.log(res);
        this.products = res;
        this.isLoading = false;
    })
  }


  initForm(){
    this.categorieForm = new FormGroup({
      categorie : new FormControl(),
    })
  }

  getTypes(){
    this.categorieService.getTypes().subscribe((res:any)=>{
      console.log(res);
      this.typeList = res;
      this.getCategories();
    })
  }

  getProjectsByPrice(){
    this.isLoading = true;
    if(!this.priceMax && !this.priceMin){
      return;
    }
    this.productService.getProductsByInterval(this.currentCategorie,this.priceMin,this.priceMax).subscribe((res:any)=>{
      this.products = res;
      this.isLoading = false;
    })
  }


}

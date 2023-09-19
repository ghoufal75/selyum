import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategorieService } from 'src/app/services/categorie.service';
import { ProduitService } from 'src/app/services/produits.service';

interface ProductType{
  _id : string;
  nom : string;
}

interface ProductCatgorie{
  _id : string;
  nom : string;
  type : any;
}


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  isCategorie = false;
  categorieForm : FormGroup;
  produitForm : FormGroup;
  produitTypes : ProductType[] = [];
  categorieList :  ProductCatgorie[] = [];
  isLoading = false;
  isUpdatingCategorie = false;
  categorieToUpdate = null;
  elementToDelete = null;
  productList : any[]= [];
  productToDelete = null;
  productToUpdate = null;
  isUpdatingProduct : any = false;
  files : any = null;
  private readonly uri = "https://firebasestorage.googleapis.com/v0/b/estya-d0bb0.appspot.com/o/ProductImages%2F";
  private readonly token = "?alt=media&token=5746c719-8e32-411b-af1b-08b139feaec7";
  constructor(private af : AngularFireStorage, private produitService : ProduitService,private modalService : NgbModal,private categorieService : CategorieService){}

  ngOnInit(){

    this.initForms();
    this.getTypes();
    this.getCategorie();
    this.getProducts();

  }

  initForms(){
    this.categorieForm = new FormGroup({
      nom: new FormControl("",Validators.required),
      idType : new FormControl('',Validators.required),
    });
    this.produitForm = new FormGroup({
      nom : new FormControl("",[Validators.required]),
      prix : new FormControl("",Validators.required),
      stock : new FormControl('',Validators.required),
      type : new FormControl('',Validators.required),
      categorie : new FormControl("",Validators.required),

    });

  }

  addFormInput(){
    (<FormArray>this.produitForm.get('imageUrls')).push(new FormControl(null));
  }
  onUploadImages(event : any){
    this.files = event.target.files;
    console.log(this.files);
  }




  showModal(modal){
    this.modalService.open(modal,{centered : true,size : "lg"});
  }

  getSubCategories(){
    return this.categorieList.filter(el=>el.type._id === this.produitForm.get('type')!.value);
  }

  chooseCategorieToUpdate(categorie,modal){
    this.isUpdatingCategorie = true;
    this.categorieToUpdate = categorie;
    this.categorieForm.get('nom')?.setValue(categorie.nom);
    this.categorieForm.get('idType')?.setValue(categorie.type._id);
    this.showModal(modal);
  }

  toggleCategorie(){
    this.isCategorie = !this.isCategorie;
  }

  chooseElementToDelete(el,modal){
    if(this.isCategorie){
      this.elementToDelete = el;
    }
    else{
      this.productToDelete = el;
    }
    this.showModal(modal);
  }
  getTypes(){
    this.categorieService.getTypes().subscribe((res:any)=>{
      this.produitTypes = res;
    })
  }

  getProducts(){
      this.produitService.getProducts().subscribe((res:any)=>{
        this.productList = res;
        this.isLoading = false;
        console.log("Products : ",res)
        this.produitForm.reset();
      })
  }

  deleteField(index){
    (<Array<any>>this.produitForm.get('imageUrls')!['controls']).splice(index,1);
  }



  chooseProductToUpdate(product,modal){
    console.log(product);
    this.productToUpdate = product;
    this.produitForm.get('nom')?.setValue(product.nom);
    this.produitForm.get('stock')?.setValue(product.stock);
    this.produitForm.get('prix')?.setValue(product.prix);
    this.produitForm.get('categorie')?.setValue(product.categorie);
    this.produitForm.get('type')?.setValue(product.categorie.nom);
    this.produitForm.get('imgUrls')?.setValue(product.imgUrls);
    this.showModal(modal);
  }


  deleteProduct(){
    this.modalService.dismissAll();
    this.isLoading = true;
    this.produitService.deleteProduit(this.productToDelete!['_id']).subscribe(res=>{
      this.getProducts();
    })
  }

  deleteElement(){
    this.isLoading = true;
    this.modalService.dismissAll();
    this.categorieService.deleteCategorie(this.elementToDelete!["_id"]).subscribe(res=>{
      this.getCategorie();

    });
  }

  getCategorie(){
    this.categorieService.getCategories().subscribe((res:any)=>{
      console.log(res);
      this.categorieList = res;
      this.elementToDelete = null;
      this.isUpdatingCategorie = false;
      this.categorieToUpdate = null;
      this.modalService.dismissAll();
      this.categorieForm.reset();
      this.isLoading=false;
    });
  }

  onSubmitCategorieForm(){
    this.isLoading = true;
    let formValues = this.categorieForm.value;
    console.log(formValues);
    if(this.isUpdatingCategorie){
        this.categorieService.updateCatgeorie(this.categorieToUpdate!['_id'],formValues).subscribe(res=>{
          this.getCategorie();
        })
    }
    else{
      this.categorieService.addCategorie(formValues.nom,formValues.idType).subscribe(res=>{
        this.modalService.dismissAll();
        this.getCategorie();
      });
    }

  }


  async onSubmitProduitForm(){
    this.isLoading = true;
    this.modalService.dismissAll();
    const urls : any[] = [];
    for(let el of this.files){
      let resTemp = await this.af.upload(`ProductImages/${el.name}`,el);
      urls.push(this.uri+el.name+this.token);
    }
    const formValues = this.produitForm.value;
    this.produitService.addProduit(formValues['nom'],formValues['prix'],formValues['stock'],formValues["categorie"],urls).subscribe(res=>{
      this.getProducts();
    })
  }

}

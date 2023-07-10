import { Component } from '@angular/core';
import { Product } from 'src/app/Models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products : Product [] = [
    {
      nom : "Playstation 4",
      img : "https://atlas-content-cdn.pixelsquid.com/assets_v2/245/2452423176773178782/jpeg-600/G03.jpg?modifiedAt=1",
      prix : "650"
    },
    {
      nom : "Ninteindo WII 4.3 (Latest)",
      img : "../../../assets/images/image4.png",
      prix : "500"
    },
    {
      nom : "Manette PS4 Black Version",
      img : "../../../assets/images/image1.png",
      prix : "60"
    },
    {
      nom : "Manette PS5 Milk Version",
      img : "../../../assets/images/image2.png",
      prix : "85"
    },
    {
      nom : "Playstation 4",
      img : "https://atlas-content-cdn.pixelsquid.com/assets_v2/245/2452423176773178782/jpeg-600/G03.jpg?modifiedAt=1",
      prix : "650"
    },
    {
      nom : "Ninteindo WII 4.3 (Latest)",
      img : "../../../assets/images/image4.png",
      prix : "500"
    },
    {
      nom : "Manette PS4 Black Version",
      img : "../../../assets/images/image1.png",
      prix : "60"
    },
    {
      nom : "Manette PS5 Milk Version",
      img : "../../../assets/images/image2.png",
      prix : "85"
    },
  ]

}

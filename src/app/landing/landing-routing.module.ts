import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LandingComponent } from "./landing.component";
import { MainComponent } from "./main/main.component";

const routes : Routes = [
    {path : "",component : LandingComponent,children:[
        {path : "main",loadChildren : () => import('./main/main.module').then(m=>m.LandingModule)},
        {path : "products/:type",loadChildren : () => import('./products/products.module').then(m=>m.ProductsModule)},
        {path : "",redirectTo : 'main',pathMatch : 'full'},
    ]}
]
@NgModule({
 imports : [RouterModule.forChild(routes)],
 exports : [RouterModule]
})
export class LandingRoutingModule{

}

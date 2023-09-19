
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";

const routes : Routes = [
    {path : "",component : DashboardComponent, children : [
        {path : "", loadChildren : () => import('./tableau-de-bord/tableau-de-bord.module').then(m=>m.TableauDeBordModule)},
        {path : "commandes", loadChildren : () => import('./commande/commande.module').then(m=>m.CommandeModule)},
        {path : "products", loadChildren : () => import('./products/products.module').then(m=>m.ProductsModule)},

    ]}
];
@NgModule({
    imports : [RouterModule.forChild(routes)],
    exports : [RouterModule],
})
export class DashboardRoutingModule{}

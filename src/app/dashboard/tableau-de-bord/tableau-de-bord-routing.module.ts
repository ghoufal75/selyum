import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TableauDeBordComponent } from "./tableau-de-bord.component";



const routes :  Routes = [
    {path : "",component : TableauDeBordComponent},

]

@NgModule({
    imports : [RouterModule.forChild(routes)],
    exports : [RouterModule]

})
export class TableauDeBordRoutingModule{}

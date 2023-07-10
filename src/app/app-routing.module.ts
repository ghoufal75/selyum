import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes : Routes = [
    {path : 'fr',loadChildren : ()=> import('./landing/landing.module').then(m=>m.LandingModule)},
    {path : '', redirectTo : 'fr', pathMatch : 'full'},]
@NgModule({
    imports : [RouterModule.forRoot(routes)],
    exports : [RouterModule]
})
export class AppRoutingModule{}

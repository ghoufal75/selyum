import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes : Routes = [
    {path : 'fr',loadChildren : ()=> import('./landing/landing.module').then(m=>m.LandingModule)},
    {path : "auth",loadChildren : ()=> import('./auth/auth.module').then(m=>m.AuthModule)},
    {path : "dashboard",loadChildren : ()=> import('./dashboard/dashboard.module').then(m=>m.DashboardModule)},
    {path : '', redirectTo : 'fr', pathMatch : 'full'},]
@NgModule({
    imports : [RouterModule.forRoot(routes)],
    exports : [RouterModule]
})
export class AppRoutingModule{}

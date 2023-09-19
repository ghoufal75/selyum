import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AdminAuthComponent } from './admin-auth/admin-auth.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import {AngularFireModule} from "@angular/fire/compat";
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    AdminAuthComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModalModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
    apiKey: "AIzaSyDYaSZ9BXjd2Ul1vqG_VcKv1ygMZrnqRCo",
    authDomain: "estya-d0bb0.firebaseapp.com",
    databaseURL: "https://estya-d0bb0-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "estya-d0bb0",
    storageBucket: "estya-d0bb0.appspot.com",
    messagingSenderId: "713036891843",
    appId: "1:713036891843:web:a14a43a9ca26510103c476",
    measurementId: "G-6WH4G8MFVJ"
  }),

  ],
  providers: [{provide : HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi : true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

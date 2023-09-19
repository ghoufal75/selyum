import { Component } from '@angular/core';
import { FormGroup, ValidatorFn, AbstractControl, ValidationErrors, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  isNightMode:boolean=false;
  isSignUp:boolean=false;
  loginForm : FormGroup;
  signUpForm : FormGroup;
  errorRes = "";
  success = "";
  isLoading = false;
  role : string;

  constructor(
    // private navService : NavService,
    // private authService : AuthService,
     private router : Router,
     private authService : AuthenticationService,
    private activatedRoute : ActivatedRoute){
    this.activatedRoute.paramMap.subscribe((params)=>{
      // this.role = params.get('role');
      console.log("role ::",this.role)
    })
  }

  ngOnInit(){
    this.initForms();
  }


  onLogin(){
    this.authService.signIn(this.loginForm.value).subscribe(res=>{
      this.router.navigateByUrl('/fr/products/consoles');
    })

  }

  onSignUp(){
    this.authService.signUp(this.signUpForm.value).subscribe(res=>{
      console.log(res);
      this.isSignUp = false;

      this.success = "Utilisateur crée avec succées.";
      setTimeout(()=>{
        this.success = "";
      },1000);
    })
  }

  initForms(){

      const passwordMatchValidator: ValidatorFn = (
      control: AbstractControl
    ): ValidationErrors | null => {
      const password=control.get('password');
      const conf=control.get('confirmation');
      if(password?.value!=conf?.value){
        conf?.setErrors({notMatched:true});
      }
      return (password?.value!=conf?.value)?{notMatched:true}:null;
    };


    this.loginForm = new FormGroup({
      "email" : new FormControl("",[Validators.required,Validators.email]),
      "password" : new FormControl("",[Validators.required])
    });
    this.signUpForm = new FormGroup({
      "fullName" : new FormControl('',[Validators.required]),
      "adresse" : new FormControl('',[Validators.required]),
      "email" : new FormControl('',[Validators.required,Validators.email]),
      "phoneNumber" : new FormControl('',[Validators.required,Validators.min(111111111),Validators.max(999999999)]),
      "password": new FormControl('',[Validators.required]),
      "confirmation": new FormControl('',[Validators.required]),
    },{validators:passwordMatchValidator});

  }





  toggleNightMode(){
    this.isNightMode = !this.isNightMode;
  }
  toggleIsSignUp(){
    this.success = '';
    this.errorRes='';
    this.isSignUp=!this.isSignUp;
  }
}

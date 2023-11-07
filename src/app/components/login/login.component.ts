import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/models/Response/LoginResponse';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginScreen = true;

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authenticationService: AuthenticationService, 
    private router: Router) {
  }

  login() {
    this.authenticationService.login(this.form.controls.email.value, this.form.controls.password.value)
      .subscribe((res: LoginResponse)=> {
        if (res) {
          localStorage.setItem('name', res.name);
          localStorage.setItem('surname', res.surname);
          localStorage.setItem('email', res.email);
          localStorage.setItem('access_token', res.token);

          this.router.navigate(['home']);          
          
          this.authenticationService.loggedIn.next(true);
        }
      })
  }

  register() {
    const newUser = this.form.getRawValue();
    this.authenticationService.register(newUser)
      .subscribe((res: any)=> {
        if (res) {
          this.switchScreen();
          this.authenticationService.loggedIn.next(true);
        }
      })
  }

  switchScreen(){
    this.loginScreen = !this.loginScreen;
    if(this.loginScreen){
      this.form = new FormGroup({
        name: new FormControl(''),
        surname: new FormControl(''),
        email: new FormControl(''),
        password: new FormControl(''),
      });
      this.form.markAsPristine()
    }
    else{
      this.form = new FormGroup({
        name: new FormControl('',[Validators.required]),
        surname: new FormControl('',[Validators.required]),
        email: new FormControl('',[Validators.required, Validators.pattern(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)]),
        password: new FormControl('',[Validators.required]),
      });
      this.form.markAsPristine()
    }
  }
}

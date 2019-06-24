import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/finally';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '@services/login.service';
import { DataShareService } from '@services/data-share.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  submitted: Boolean = false;
  wrongCredentials: Boolean = false;
  isLoading: Boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,
    private dataShareService: DataShareService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get form(): any { return this.loginForm.controls; }

  onLoginSubmit(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.loginService.loginUser(this.loginForm.value)
        .finally(() => this.isLoading = false)
        .subscribe((data: any) => {
          this.wrongCredentials = false;
          this.dataShareService.setLoggedInUser(data);
          this.loginService.setIsLoggedIn(true);
          localStorage.setItem('user', JSON.stringify(data));
          localStorage.setItem('JWT', String(data.jwt));
          this.router.navigate(['/home-page']);
        }, (/*error*/) => {
          this.wrongCredentials = true;
        });
    }
  }

}

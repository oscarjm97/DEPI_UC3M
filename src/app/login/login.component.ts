<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

=======
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {

  hide: boolean;
  loginForm: FormGroup;
  validation_messages = {
    'user': [
      { type: 'required', message: 'User is required.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' }
    ]
  };

  constructor(private router: Router, private renderer: Renderer2, fb: FormBuilder) {
    //this.renderer.setStyle(document.body, "background", "#FFF");
    this.loginForm = fb.group({
      user: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.hide = true;
    document.body.className = "bg-body";
  }

  ngOnDestroy() {
    document.body.className = "";
  }

  onSubmit(value) {
    console.log(value);
    this.router.navigate(['index']);
  }
>>>>>>> develop
}

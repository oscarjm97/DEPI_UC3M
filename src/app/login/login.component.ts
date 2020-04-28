import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from '../services/firestore/user.service';
import { Subscription } from 'rxjs';
import { User } from '../model/User';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {

  hide: boolean;
  loginForm: FormGroup;
  validation_messages = {
    'user': [
      { type: 'required', message: 'This field is required.' }
    ],
    'password': [
      { type: 'required', message: 'This field is required.' }
    ]
  };
  users: User[];
  s_users: Subscription;
  userLogged: User;
  existUser: boolean;

  constructor(private router: Router, private renderer: Renderer2, fb: FormBuilder, private userService: UserService) {
    //this.renderer.setStyle(document.body, "background", "#FFF");
    this.loginForm = fb.group({
      user: ["", Validators.required],
      password: ["", Validators.required]
    });
    this.users = [];
    this.userLogged = new User();
    this.existUser = false;
  }

  ngOnInit() {
    this.hide = true;
    document.body.className = "bg-body";
    this.s_users = this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  ngOnDestroy() {
    document.body.className = "";
    this.s_users.unsubscribe();
  }

  async onSubmit(value) {
    console.log(value);
    for (let user of this.users) {
      if (user.userID == value.user) {
        this.existUser = true;
      }
    }

    if (this.existUser) {
      this.userLogged = await this.userService.getUser(value.user);
      if (this.userLogged.password == value.password) {
        console.log("Login successful.");
        // Marcar usuario como logueado
        this.router.navigate(['index']);
      } else {
        console.log("The password is not correct.");
        this.loginForm.reset(); // Borrar los input del formulario
      }
    } else {
      console.log("The user is not registered.");
      this.loginForm.reset(); // Borrar los input del formulario
    }
    this.existUser = false;
  }
}

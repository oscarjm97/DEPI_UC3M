import { Component, OnInit, OnDestroy, Renderer2 } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { Subscription } from "rxjs";
import { User } from "../model/User";
import { AuthService } from "./../shared/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  hide: boolean;
  loginForm: FormGroup;
  validation_messages = {
    userID: [{ type: "required", message: "This field is required." }],
    password: [{ type: "required", message: "This field is required." }],
  };
  users: User[];
  s_users: Subscription;
  userLogged: User;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    fb: FormBuilder,
    private authService: AuthService
  ) {
    //this.renderer.setStyle(document.body, "background", "#FFF");
    this.loginForm = fb.group({
      userID: ["", Validators.required],
      password: ["", Validators.required],
    });
    this.users = [];
    this.userLogged = new User();
  }

  ngOnInit() {
    this.hide = true;
    document.body.className = "bg-body";
    this.s_users = this.authService.getAllUsers().subscribe((data) => {
      this.users = data;
    });
  }

  ngOnDestroy() {
    document.body.className = "";
    this.s_users.unsubscribe();
  }

  async onSubmit(value) {
    const exists = this.authService.checkExistUser(value.userID);
    if (exists) {
      this.userLogged = await this.authService.getUserById(value.userID);
      if (this.userLogged.password == value.password) {
        await this.authService.SignIn(this.userLogged);
        console.log("Login sucessful!");
      } else {
        console.log("The password is not correct.");
        this.loginForm.reset(); // Borrar los input del formulario
      }
    } else {
      console.log("The user is not registered.");
      this.loginForm.reset(); // Borrar los input del formulario
    }
  }
}

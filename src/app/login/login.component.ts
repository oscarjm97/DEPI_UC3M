import { Component, OnInit, OnDestroy, Renderer2 } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { AuthService } from "./../shared/auth.service";
import { User } from "../model/User";

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
  userLogged: User;

  constructor(
    private renderer: Renderer2,
    fb: FormBuilder,
    private authService: AuthService
  ) {
    //this.renderer.setStyle(document.body, "background", "#FFF");
    this.loginForm = fb.group({
      userID: ["", Validators.required],
      password: ["", Validators.required],
    });
    this.userLogged = new User();
  }

  ngOnInit() {
    this.hide = true;
    document.body.className = "bg-body";
  }

  ngOnDestroy() {
    document.body.className = "";
  }

  async onSubmit(value) {
    const exists = await this.authService.checkExistUser(value.userID);
    if (exists) {
      this.userLogged = await this.authService.getUserById(value.userID);
      if (this.userLogged.password == value.password) {
        this.authService.SignIn(this.userLogged);
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

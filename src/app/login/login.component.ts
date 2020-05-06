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
    userID: [{ type: "required", message: "Este campo es obligatorio!" }],
    password: [{ type: "required", message: "Este campo es obligatorio!" }],
  };
  userLogged: User;
  message: string;

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
    this.message = "";
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
        this.message = "Usuario logueado con éxito!";
        this.showMessage(true);
        this.authService.SignIn(this.userLogged);
      } else {
        this.message = "Contraseña incorrecta!";
        this.showMessage(false);
        this.loginForm.reset();
      }
    } else {
      this.message = "Usuario no registrado!";
      this.showMessage(false);
      this.loginForm.reset();
    }
  }

  showMessage(green: boolean) {
    var newSnackbar = document.createElement("div");
    newSnackbar.classList.add("snackbar");
    document.querySelector("body").appendChild(newSnackbar);

    newSnackbar.textContent = this.message;
    if (!green) {
      newSnackbar.style.backgroundColor = "red";
    } else {
      newSnackbar.style.backgroundColor = "green";
    }
    newSnackbar.classList.add("active");
    setTimeout(() => {
      newSnackbar.classList.remove("active");
    }, 3000);
  }
}

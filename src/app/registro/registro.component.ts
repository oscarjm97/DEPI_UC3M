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
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.scss"],
})
export class RegistroComponent implements OnInit, OnDestroy {
  hide: boolean;
  signupForm: FormGroup;
  validation_messages = {
    name: [{ type: "required", message: "Este campo es obligatorio." }],
    surname: [{ type: "required", message: "Este campo es obligatorio." }],
    email: [{ type: "required", message: "Este campo es obligatorio." }],
    userID: [{ type: "required", message: "Este campo es obligatorio." }],
    password: [{ type: "required", message: "Este campo es obligatorio." }],
    rol: [{ type: "required", message: "Seleccione un tipo de usuario" }],
  };
  userLogged: User;
  message: string;

  constructor(
    private renderer: Renderer2,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.signupForm = fb.group({
      name: ["", Validators.required],
      surname: ["", Validators.required],
      email: ["", Validators.required],
      userID: ["", Validators.required],
      password: ["", Validators.required],
      rol: ["", Validators.required],
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
    if (!exists) {
      this.message = "Usuario creado con éxito!"
      await this.authService.createUser(value).then((res) => {
        this.showMessage(true);
      });
      this.userLogged = await this.authService.getUserById(value.userID);
      this.authService.SignIn(this.userLogged);
    } else {
      this.message = "Usuario ya existente!"
      this.showMessage(false);
      this.signupForm.reset(); // Borrar los input del formulario
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

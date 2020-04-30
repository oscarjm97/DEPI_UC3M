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
    name: [{ type: "required", message: "This field is required." }],
    surname: [{ type: "required", message: "This field is required." }],
    email: [{ type: "required", message: "This field is required." }],
    userID: [{ type: "required", message: "This field is required." }],
    password: [{ type: "required", message: "This field is required." }],
    rol: [{ type: "required", message: "Choose a type of user" }],
  };
  userLogged: User;

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
      await this.authService.createUser(value).then((res) => {
        console.log("The user has been created successfully.");
      });
      this.userLogged = await this.authService.getUserById(value.userID);
      this.authService.SignIn(this.userLogged);
    } else {
      console.log("This user already exist.");
      this.signupForm.reset(); // Borrar los input del formulario
    }
  }
}

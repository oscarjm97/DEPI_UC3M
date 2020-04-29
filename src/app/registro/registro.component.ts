import { Component, OnInit, OnDestroy, Renderer2 } from "@angular/core";
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from '../services/firestore/user.service';
import { Subscription } from 'rxjs';
import { User } from '../model/User';

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.scss"],
})
export class RegistroComponent implements OnInit, OnDestroy {

  hide: boolean;
  signupForm: FormGroup;
  validation_messages = {
    'name': [
      { type: 'required', message: 'This field is required.' }
    ],
    'surname': [
      { type: 'required', message: 'This field is required.' }
    ],
    'email': [
      { type: 'required', message: 'This field is required.' }
    ],
    'userID': [
      { type: 'required', message: 'This field is required.' }
    ],
    'password': [
      { type: 'required', message: 'This field is required.' }
    ],
    'rol': [
      { type: 'required', message: 'Choose a type of user' }
    ]
  };
  users: User[];
  s_users: Subscription;
  uniqueUser: boolean;

  constructor(private router: Router, private renderer: Renderer2, private fb: FormBuilder, private userService: UserService) {
    this.signupForm = fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      userID: ['', Validators.required],
      password: ['', Validators.required],
      rol: ['', Validators.required]
    });
    this.users = [];
    this.uniqueUser = true;
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
  }

  onSubmit(value) {
    console.log(value);
    for (let user of this.users) {
      if (user.userID == value.userID) {
        this.uniqueUser = false;
      }
    }

    if (this.uniqueUser) {
      this.userService.createUser(value).then(res => {
        console.log("The user has been created successfully.");
        this.router.navigate(['index']);
      });
    } else {
      console.log("This user already exist.");
      this.signupForm.reset(); // Borrar los input del formulario
    }
    this.uniqueUser = true;
  }
}

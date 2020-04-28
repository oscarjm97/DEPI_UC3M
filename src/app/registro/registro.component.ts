import { Component, OnInit, OnDestroy, Renderer2 } from "@angular/core";
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

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
    'user': [
      { type: 'required', message: 'This field is required.' }
    ],
    'password': [
      { type: 'required', message: 'This field is required.' }
    ],
    'usertype': [
      { type: 'required', message: 'Choose a type of user' }
    ]
  };

  constructor(private router: Router, private renderer: Renderer2, fb: FormBuilder) {
    this.signupForm = fb.group({
      name: ["", Validators.required],
      surname: ["", Validators.required],
      email: ["", Validators.required],
      user: ["", Validators.required],
      password: ["", Validators.required],
      usertype: ["", Validators.required]
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
}

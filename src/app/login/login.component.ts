import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide: boolean;

  constructor(private router: Router) { }

  ngOnInit() {
    this.hide = true;
  }

  onSubmit(value) {
    console.log("USER INFORMATION: " + value);
    this.router.navigate(['index']);
  }
}
<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
=======
import { Component, OnInit, Renderer2 } from "@angular/core";
import { Router } from "@angular/router";
>>>>>>> d7a8806b5241bacb7bb11e0d9f5644d403344e51

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  hide: boolean;

<<<<<<< HEAD
  constructor(private router: Router) { }
=======
  constructor(private router: Router, private renderer: Renderer2) {
    //this.renderer.setStyle(document.body, "background", "#FFF");
  }
>>>>>>> d7a8806b5241bacb7bb11e0d9f5644d403344e51

  ngOnInit() {
    this.hide = true;
    document.body.className = "bg-body";
  }
<<<<<<< HEAD

  onSubmit(value) {
    console.log("USER INFORMATION: " + value);
    this.router.navigate(['index']);
=======
  ngOnDestroy() {
    document.body.className = "";
>>>>>>> d7a8806b5241bacb7bb11e0d9f5644d403344e51
  }
}

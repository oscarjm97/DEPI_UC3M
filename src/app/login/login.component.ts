import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {

  hide: boolean;

  constructor(private router: Router, private renderer: Renderer2) {
    //this.renderer.setStyle(document.body, "background", "#FFF");
  }

  ngOnInit() {
    this.hide = true;
    document.body.className = "bg-body";
  }

  onSubmit(value) {
    console.log("USER INFORMATION: " + value);
    this.router.navigate(['index']);
  }

  ngOnDestroy() {
    document.body.className = "";
  }
}

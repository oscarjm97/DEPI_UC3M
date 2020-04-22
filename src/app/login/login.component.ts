import { Component, OnInit, Renderer2 } from "@angular/core";
import { Router } from "@angular/router";

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
  ngOnDestroy() {
    document.body.className = "";
  }
}

import { Component, OnInit, Renderer2 } from "@angular/core";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.scss"],
})
export class RegistroComponent implements OnInit {
  hide: boolean;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.hide = true;
    document.body.className = "bg-body";
  }
  ngOnDestroy() {
    document.body.className = "";
  }
}

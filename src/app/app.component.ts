import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {

  logged: boolean;
  title = "NEXT ADVENTURE";

  ngOnInit() {
    this.logged = true;
  }
}

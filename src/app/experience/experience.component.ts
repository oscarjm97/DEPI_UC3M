import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { DialogExampleComponent } from "./../dialog-example/dialog-example.component";

@Component({
  selector: "app-experience",
  templateUrl: "./experience.component.html",
  styleUrls: ["./experience.component.scss"],
})
export class ExperienceComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(DialogExampleComponent);
  }

  ngOnInit() {}
}

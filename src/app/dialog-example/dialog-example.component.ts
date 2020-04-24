import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "app-dialog-example",
  templateUrl: "./dialog-example.component.html",
  styleUrls: ["./dialog-example.component.scss"],
})
export class DialogExampleComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DialogExampleComponent>) {}

  ngOnInit() {}

  onClose(): void {
    this.dialogRef.close();
  }
}

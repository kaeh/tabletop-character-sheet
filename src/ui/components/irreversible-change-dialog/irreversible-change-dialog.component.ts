import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";

@Component({
	standalone: true,
	imports: [
		// Angular
		CommonModule,
		// Material
		MatDialogModule,
		MatButtonModule,
	],
	templateUrl: "./irreversible-change-dialog.component.html",
	styleUrl: "./irreversible-change-dialog.component.scss",
})
export class IrreversibleChangeDialog {}

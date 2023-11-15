import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
	selector: "app-character-sheet",
	standalone: true,
	imports: [
		// Angular
		CommonModule,
	],
	templateUrl: "./character-sheet.component.html",
})
export class TalesFromTheLoopCharacterSheetComponent {}

import { CommonModule } from "@angular/common";
import { Component, input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";

@Component({
	selector: "app-create-card",
	standalone: true,
	imports: [
		// Angular
		CommonModule,
		RouterLink,
		// Material
		MatCardModule,
		MatIconModule,
		MatButtonModule,
	],
	templateUrl: "./create-card.component.html",
})
export class CreateCardComponent {
	public readonly routerLink = input.required<RouterLink["routerLink"]>();
}

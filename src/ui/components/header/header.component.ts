import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Auth, user } from "@angular/fire/auth";
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { RoutesConstants } from "@constants";
import { map } from "rxjs";

@Component({
	selector: "app-header",
	standalone: true,
	imports: [
		// Angular
		CommonModule,
		RouterLink,
		RouterLinkActive,
		// Material
		MatToolbarModule,
		MatIconModule,
		MatButtonModule,
		MatRippleModule,
		MatMenuModule,
	],
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
	protected readonly RoutesConstants = RoutesConstants;
	protected readonly userAvatar$ = user(inject(Auth)).pipe(map((user) => user?.photoURL));
	protected readonly menuItems = [
		{
			label: "Mes personnages",
			routerLink: RoutesConstants.charactersList.path,
		},
		{
			label: "Mes parties",
			routerLink: RoutesConstants.partiesList.path,
		},
		{
			label: "Nouveau personnage",
			routerLink: RoutesConstants.characterCreation,
		},
	];

	private readonly auth = inject(Auth);

	protected logout() {
		this.auth.signOut();
	}
}

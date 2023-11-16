import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Auth, signOut } from "@angular/fire/auth";
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { RoutesConstants } from "@constants";
import { UserAvatarFallbackPipe } from "@ui/pipes";

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
    // Internal
    UserAvatarFallbackPipe
	],
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
	protected readonly RoutesConstants = RoutesConstants;
	protected readonly userAvatar = inject(Auth).currentUser?.photoURL;
	protected readonly menuItems = [
		{
			label: "Mes personnages",
			routerLink: RoutesConstants.charactersList.path,
		},
		{
			label: "Mes parties",
			routerLink: RoutesConstants.partiesList.path,
		},
	];

	private readonly auth = inject(Auth);
	private readonly _router = inject(Router);

	protected async logout() {
		await signOut(this.auth);
		await this._router.navigate(["/", RoutesConstants.authentication]);
	}
}

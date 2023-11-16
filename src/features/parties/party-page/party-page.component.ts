import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatTabsModule } from "@angular/material/tabs";
import { ActivatedRoute } from "@angular/router";
import { RoutesConstants } from "@constants";
import { IsUserGameMasterPipe } from "@ui/pipes";
import { PartyPageAdminComponent } from "./party-page-admin/party-page-admin.component";
import { PartyPageContentComponent } from "./party-page-content/party-page-content.component";
import { injectParty } from "./party.injector";

@Component({
	selector: "app-party-page",
	standalone: true,
	imports: [
		// Angular
		CommonModule,
		// Material
		MatTabsModule,
		// Internal
		IsUserGameMasterPipe,
		PartyPageContentComponent,
		PartyPageAdminComponent,
	],
	templateUrl: "./party-page.component.html",
})
export class PartyPageComponent {
	protected readonly party$$ = toSignal(injectParty(inject(ActivatedRoute).snapshot.paramMap.get(RoutesConstants.partiesList.routeParams.partyId) ?? "ERROR_NO_PARTY_ID"));
}

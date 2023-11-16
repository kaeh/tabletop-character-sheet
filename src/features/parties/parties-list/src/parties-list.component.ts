import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { DocumentReference, Firestore, doc, docData } from "@angular/fire/firestore";
import { MatCardModule } from "@angular/material/card";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterLink } from "@angular/router";
import { RoutesConstants } from "@constants";
import { BasePersistedParty, PersistedUser } from "@models";
import { CreateCardComponent } from "@ui/components/create-card";
import { GameIdToTitlePipe, PartyImageFallbackPipe, RefToDocPipe, ToPersistedUserPipe, UserAvatarFallbackPipe } from "@ui/pipes";
import { injectUserId } from "@utils";
import { Observable, filter, map, switchMap, zip } from "rxjs";

type AsyncParty = Observable<BasePersistedParty>;
type AsyncPartiesList = Observable<BasePersistedParty[]>;

const injectPartiesList = (): AsyncPartiesList => {
	const user = doc(inject(Firestore), "users", injectUserId()) as DocumentReference<PersistedUser>;

	return docData(user).pipe(
		filter((x): x is PersistedUser => !!x),
		map(({ parties }) => parties.map((party) => docData(party, { idField: "id" }) as AsyncParty)),
		switchMap((parties) => zip(parties)),
	);
};

@Component({
	selector: "app-parties-list",
	standalone: true,
	templateUrl: "./parties-list.component.html",
	styleUrls: ["./parties-list.component.scss"],
	imports: [
		// Angular
		CommonModule,
		RouterLink,
		// Material
		MatCardModule,
		MatTooltipModule,
		// Internal
		CreateCardComponent,
		RefToDocPipe,
		ToPersistedUserPipe,
		UserAvatarFallbackPipe,
		GameIdToTitlePipe,
		PartyImageFallbackPipe,
	],
})
export class PartiesListComponent {
	protected readonly partiesList$ = injectPartiesList();

	protected readonly RoutesConstants = RoutesConstants;
}

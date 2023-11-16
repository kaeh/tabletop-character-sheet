import { CommonModule, NgOptimizedImage } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Firestore, collection, collectionData } from "@angular/fire/firestore";
import { MatCardModule } from "@angular/material/card";
import { RouterLink } from "@angular/router";
import { RoutesConstants } from "@constants";
import { BasePersistedParty } from "@models";
import { CreateCardComponent } from "@ui/components/create-card";
import { injectUserId } from "@utils";
import { Observable } from "rxjs";

type PartiesList = BasePersistedParty[];
type AsyncPartiesList = Observable<PartiesList>;

@Component({
	selector: "app-parties-list",
	standalone: true,
	imports: [
		// Angular
		CommonModule,
		NgOptimizedImage,
		RouterLink,
		// Material
		MatCardModule,
		// Internal
		CreateCardComponent,
	],
	templateUrl: "./parties-list.component.html",
})
export class PartiesListComponent {
	protected readonly partiesList$ = collectionData(collection(inject(Firestore), "users", injectUserId(), "parties"), { idField: "id" }) as AsyncPartiesList;

	protected readonly RoutesConstants = RoutesConstants;
}

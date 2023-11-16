import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { BasePersistedParty } from "@models";
import { GameIdToTitlePipe } from "@ui/pipes";

@Component({
	selector: "app-party-page-content",
	standalone: true,
	imports: [
		// Angular
		CommonModule,
		// Internal
		GameIdToTitlePipe,
	],
	templateUrl: "./party-page-content.component.html",
})
export class PartyPageContentComponent {
	@Input({ required: true }) party!: BasePersistedParty;
}

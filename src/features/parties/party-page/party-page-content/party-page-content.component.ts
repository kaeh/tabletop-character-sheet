import { CommonModule } from "@angular/common";
import { Component, Input, inject } from "@angular/core";
import { Firestore, doc, docData, updateDoc } from "@angular/fire/firestore";
import { BasePersistedParty } from "@models";
import { SnackbarService } from "@services";
import { GameIdToTitlePipe } from "@ui/pipes";
import { injectUserId } from "@utils";
import { Observable, firstValueFrom } from "rxjs";
import { PlayerCardComponent } from "../player-card/player-card.component";

@Component({
	selector: "app-party-page-content",
	standalone: true,
	imports: [
		// Angular
		CommonModule,
		// Internal
		GameIdToTitlePipe,
		PlayerCardComponent,
	],
	templateUrl: "./party-page-content.component.html",
})
export class PartyPageContentComponent {
	@Input({ required: true }) party!: BasePersistedParty;

	private readonly _userId = injectUserId();
	private readonly _firestore = inject(Firestore);
	private readonly _snackBarService = inject(SnackbarService);

	protected async updateCharacter(characterId: string | null) {
		try {
			const playerRef = this.party.players.find((player) => player.ref.id === this._userId)?.ref;

			if (!playerRef) {
				throw new Error("Player not found");
			}

			const partyCollectionRef = doc(this._firestore, "parties", this.party.id);
			const party = await firstValueFrom(docData(partyCollectionRef) as Observable<BasePersistedParty>);

			if (!party) {
				throw new Error("Party not found");
			}

			const players = party.players.map((player) => {
				if (player.ref.id === this._userId) {
					return {
						...player,
						character: characterId ? doc(playerRef, `characters/${characterId}`) : null,
					};
				}
				return player;
			});

			await updateDoc(partyCollectionRef, { players });

			this._snackBarService.showSuccess("Personnage mis à jour");
		} catch (error) {
			this._snackBarService.showFailure("Impossible de mettre à jour le personnage");
		}
	}
}

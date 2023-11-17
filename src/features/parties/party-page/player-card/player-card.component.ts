import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output, Signal, computed, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Firestore, collection, collectionData, docData, query, where } from "@angular/fire/firestore";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Router } from "@angular/router";
import { RoutesConstants } from "@constants";
import { BasePersistedCharacter, PersistedUser, Player } from "@models";
import { CharacterAvatarFallbackPipe, UserAvatarFallbackPipe } from "@ui/pipes";
import { injectUserId } from "@utils";
import { Observable, ReplaySubject, filter, map, of, switchMap, take } from "rxjs";

@Component({
	selector: "app-player-card",
	standalone: true,
	imports: [
		// Angular
		CommonModule,
		// Material
		MatCardModule,
		MatIconModule,
		MatButtonModule,
		MatTooltipModule,
		MatMenuModule,
		MatDividerModule,
		// Internal
		UserAvatarFallbackPipe,
		CharacterAvatarFallbackPipe,
	],
	templateUrl: "./player-card.component.html",
})
export class PlayerCardComponent {
	@Input({ required: true }) public gameId!: string;

	@Input({ required: true })
	public set player(value: Player) {
		this._updateUser$.next(value.ref);
		this._updateCharacter$.next(value.character);
	}

	@Output() public readonly characterChanged = new EventEmitter<string | null>();

	protected readonly user$$: Signal<PersistedUser | undefined>;
	protected readonly character$$: Signal<BasePersistedCharacter | undefined>;
	protected readonly isCurrentUser$$: Signal<boolean>;
	protected readonly characters$: Observable<BasePersistedCharacter[]> = of([]);

	private readonly _updateUser$ = new ReplaySubject<Player["ref"]>();
	private readonly _updateCharacter$ = new ReplaySubject<Player["character"]>();
	private readonly _router = inject(Router);
	private readonly _firestore = inject(Firestore);

	public constructor() {
		const user$ = this._updateUser$.pipe(switchMap((userRef) => docData(userRef, { idField: "id" }) as Observable<PersistedUser>));
		const character$ = this._updateCharacter$.pipe(switchMap((characterRef) => (characterRef ? docData(characterRef, { idField: "id" }) : of(undefined))));

		this.user$$ = toSignal(user$);
		this.character$$ = toSignal(character$);

		const uid = injectUserId();
		this.isCurrentUser$$ = computed(() => this.user$$()?.id === uid);

		// Get characters of current user, filter out those with a different game id
		this.characters$ = user$.pipe(
			filter(({ id }) => id === uid),
			map(() => collection(this._firestore, "users", uid, "characters")),
			map((charactersColref) => query(charactersColref, where("gameId", "==", this.gameId))),
			switchMap((charactersQuery) => collectionData(charactersQuery, { idField: "id" }) as Observable<BasePersistedCharacter[]>),
			take(1),
		);
	}

	protected openCharacterSheet() {
		if (this.character$$()) {
			this._router.navigate(["/", RoutesConstants.charactersList.path, this.character$$()?.gameId, this.character$$()?.id], {
				state: {
					[RoutesConstants.charactersList.routeState.ownerId]: this.user$$()?.id,
				},
			});
		}
	}
}

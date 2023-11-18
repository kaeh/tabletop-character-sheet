import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { RoutesConstants } from "@constants";
import { SnackbarService } from "@services";
import { UsersService } from "@stores";
import { CreateCardComponent } from "@ui/components/create-card";
import { IrreversibleChangeDialog } from "@ui/components/irreversible-change-dialog";
import { CharacterAvatarFallbackPipe, GameIdToTitlePipe } from "@ui/pipes";
import { firstValueFrom } from "rxjs";

@Component({
	selector: "app-characters-list",
	standalone: true,
	imports: [
		// Angular
		CommonModule,
		RouterLink,
		// Material
		MatCardModule,
		MatButtonModule,
		MatDividerModule,
		MatIconModule,
		// Internal
		GameIdToTitlePipe,
		CreateCardComponent,
		CharacterAvatarFallbackPipe,
	],
	templateUrl: "./characters-list.component.html",
})
export class CharactersListComponent {
	protected readonly charactersList$ = inject(UsersService).currentUserAllCharacters$;
	protected readonly RoutesConstants = RoutesConstants;

	private readonly _userService = inject(UsersService);
	private readonly _dialog = inject(MatDialog);
	private readonly _snackBarService = inject(SnackbarService);

	protected async deleteCharacter(characterId: string) {
		const confirmation = await firstValueFrom(this._dialog.open(IrreversibleChangeDialog).afterClosed());

		if (!confirmation) {
			return;
		}

		try {
			await this._userService.deleteCharacterFromCurrentUser(characterId);
			this._snackBarService.showSuccess("Character deleted");
		} catch (error) {
			this._snackBarService.showFailure("An error occured while deleting the character");
		}
	}
}

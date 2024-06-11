import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import type { PersistedUser } from "@models";
import { SnackbarService } from "@services";
import { UsersService } from "@stores";

@Component({
	selector: "app-user-profile",
	standalone: true,
	imports: [
		// Angular
		CommonModule,
		ReactiveFormsModule,
		// Material
		MatInputModule,
		MatButtonModule,
	],
	templateUrl: "./user-profile.component.html",
})
export class UserProfileComponent {
	protected readonly form = inject(FormBuilder).nonNullable.group({
		displayName: inject(FormBuilder).nonNullable.control(inject(UsersService).currentUser?.displayName),
	});

	private readonly _snackBarService = inject(SnackbarService);
	private readonly _userService = inject(UsersService);

	protected async persistChanges() {
		try {
			await this._userService.updateCurrentUser(this.form.getRawValue() as Partial<PersistedUser>);
			this._snackBarService.showSuccess("Profil mis à jour");
		} catch (error) {
			this._snackBarService.showFailure("Erreur lors de la mise à jour du profil");
		}
	}
}

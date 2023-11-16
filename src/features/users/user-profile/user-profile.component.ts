import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Auth, User, updateProfile } from "@angular/fire/auth";
import { Firestore, doc, updateDoc } from "@angular/fire/firestore";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { SnackbarService } from "@services";

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
	protected readonly user = inject(Auth).currentUser as User;
	protected readonly form = inject(FormBuilder).nonNullable.group({
		displayName: inject(FormBuilder).nonNullable.control(this.user?.displayName),
	});

	private readonly _snackBarService = inject(SnackbarService);
	private readonly _firestore = inject(Firestore);

	protected async persistChanges() {
		try {
			await Promise.all([updateProfile(this.user, this.form.getRawValue()), updateDoc(doc(this._firestore, "users", this.user.uid), this.form.getRawValue())]);
			this._snackBarService.showSuccess("Profil mis à jour");
		} catch (error) {
			this._snackBarService.showFailure("Erreur lors de la mise à jour du profil");
		}
	}
}

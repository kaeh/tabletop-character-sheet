import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Auth, User, updateProfile } from "@angular/fire/auth";
import { Firestore, doc, updateDoc } from "@angular/fire/firestore";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";

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
		MatSnackBarModule,
	],
	templateUrl: "./user-profile.component.html",
})
export class UserProfileComponent {
	protected readonly user = inject(Auth).currentUser as User;
	protected readonly form = inject(FormBuilder).nonNullable.group({
		displayName: inject(FormBuilder).nonNullable.control(this.user?.displayName),
	});

	private readonly _snackBar = inject(MatSnackBar);
	private readonly _firestore = inject(Firestore);

	protected async persistChanges() {
		let displayedMessage = "";
		let panelClass = "";

		try {
			await Promise.all([updateProfile(this.user, this.form.getRawValue()), updateDoc(doc(this._firestore, "users", this.user.uid), this.form.getRawValue())]);
			displayedMessage = "Profil mis à jour";
			panelClass = "success";
		} catch (error) {
			displayedMessage = "Erreur lors de la mise à jour du profil";
			panelClass = "error";
		} finally {
			this._snackBar.open(displayedMessage, "", { panelClass });
		}
	}
}

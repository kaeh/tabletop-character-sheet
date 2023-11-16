import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Auth, sendPasswordResetEmail, signInWithEmailAndPassword } from "@angular/fire/auth";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { Router } from "@angular/router";
import { SnackbarService } from "@services";

@Component({
	selector: "app-authentication",
	standalone: true,
	imports: [
		// Angular
		CommonModule,
		ReactiveFormsModule,
		// Material
		MatCardModule,
		MatProgressBarModule,
		MatInputModule,
		MatButtonModule,
	],
	templateUrl: "./authentication.component.html",
	styleUrl: "./authentication.component.scss",
})
export class AuthenticationComponent {
	protected readonly form = inject(FormBuilder).nonNullable.group({
		email: inject(FormBuilder).nonNullable.control(""),
		password: inject(FormBuilder).nonNullable.control(""),
	});

	protected authPending = false;
	protected resetPasswordDisabled = false;

	private readonly auth: Auth = inject(Auth);
	private readonly router = inject(Router);
	private readonly _snackBarService = inject(SnackbarService);

	protected async tryAuthenticate() {
		this.form.setErrors(null);
		this.authPending = true;

		const { email, password } = this.form.getRawValue();

		try {
			await signInWithEmailAndPassword(this.auth, email, password);
			await this.router.navigate(["/"]);
		} catch (error) {
			this.form.setErrors({ invalidCredentials: true });
		} finally {
			this.authPending = false;
		}
	}

	protected async resetPassword() {
		if (!this.form.getRawValue().email || this.resetPasswordDisabled) {
			return;
		}

		this.auth.languageCode = "fr";

		try {
			await sendPasswordResetEmail(this.auth, this.form.getRawValue().email);
			this.resetPasswordDisabled = true;

			this._snackBarService.showSuccess("Demande de réinitialisation envoyée");
		} catch (error) {
			this._snackBarService.showFailure("Erreur lors de la demande de réinitialisation");
		}
	}
}

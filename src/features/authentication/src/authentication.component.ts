import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Auth, signInWithEmailAndPassword } from "@angular/fire/auth";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { Router } from "@angular/router";

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

	private readonly auth: Auth = inject(Auth);
	private readonly router = inject(Router);

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
}

import { Injectable, inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
	providedIn: "root",
})
export class SnackbarService {
	private readonly _snackBar = inject(MatSnackBar);

	public readonly showSuccess = (message: string) => this._snackBar.open(message, "", { panelClass: "success" });
	public readonly showFailure = (message: string) => this._snackBar.open(message, "", { panelClass: "failure" });
}

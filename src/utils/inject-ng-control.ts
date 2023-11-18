import { inject } from "@angular/core";
import { FormControlDirective, FormControlName, NgControl, NgModel } from "@angular/forms";

/**
 * @see https://netbasal.com/forwarding-form-controls-to-custom-control-components-in-angular-701e8406cc55
 */
export function injectNgControl() {
	const ngControl = inject(NgControl, { self: true, optional: true });

	if (ngControl === null || ngControl instanceof FormControlDirective || ngControl instanceof FormControlName || ngControl instanceof NgModel) {
		return ngControl;
	}

	throw new Error("Impossible d'initialiser le contrôle de formulaire.");
}

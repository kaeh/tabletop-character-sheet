import { type Signal, computed } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import type { AbstractControl } from "@angular/forms";

export const buildAsyncFormStatusSignal = (form: AbstractControl, apiCallPending$$: Signal<boolean>) => {
	const formStatus$$ = toSignal(form.statusChanges);
	const formIsInvalid$$ = computed(() => formStatus$$() !== "VALID");

	return computed(() => apiCallPending$$() || formIsInvalid$$());
};

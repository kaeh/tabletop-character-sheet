import { computed } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormControl } from "@angular/forms";
import { gameRules } from "../constants";

export const buildLuck = (ageControl: FormControl<number>) => {
	const age$$ = toSignal(ageControl.valueChanges);
	return computed(() => gameRules.ageRange.max - (age$$() ?? gameRules.ageRange.min));
};

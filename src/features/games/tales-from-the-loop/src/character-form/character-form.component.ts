import { CommonModule } from "@angular/common";
import { Component, Input, inject } from "@angular/core";
import { ControlContainer, ControlValueAccessor, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { ControlsToKeyLabelPipe } from "@ui/pipes";
import { gameLabels, gameRules } from "../constants";
import { characterForm } from "../utils/character-form.injector";

@Component({
	selector: "app-character-form",
	standalone: true,
	imports: [
		// Angular
		CommonModule,
		ReactiveFormsModule,
		// Material
		MatInputModule,
		// Internal
		ControlsToKeyLabelPipe,
	],
	templateUrl: "./character-form.component.html",
})
export class CharacterFormComponent implements ControlValueAccessor {
	@Input({ required: true }) luck!: number;

	protected readonly characterForm = (inject(ControlContainer).control as typeof characterForm) || characterForm;
	protected readonly Labels = gameLabels;
	protected readonly Rules = gameRules;

	writeValue(obj: unknown): void {
		throw new Error("Method not implemented.");
	}
	registerOnChange(fn: unknown): void {
		throw new Error("Method not implemented.");
	}
	registerOnTouched(fn: unknown): void {
		throw new Error("Method not implemented.");
	}
	setDisabledState?(isDisabled: boolean): void {
		throw new Error("Method not implemented.");
	}
}

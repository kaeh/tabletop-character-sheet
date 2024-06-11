import { CommonModule } from "@angular/common";
import { Component, Input, type OnInit, inject } from "@angular/core";
import { ControlContainer, type ControlValueAccessor, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { ImageSelectorComponent } from "@ui/components/image-selector";
import { ControlsToKeyLabelPipe } from "@ui/pipes";
import { gameLabels } from "../../constants/game-labels";
import { gameRules } from "../../constants/game-rules";
import { buildCharacterForm } from "../../utils/character-form.injector";

@Component({
	selector: "app-character-form",
	standalone: true,
	imports: [
		// Angular
		CommonModule,
		ReactiveFormsModule,
		// Material
		MatInputModule,
		MatButtonModule,
		// Internal
		ControlsToKeyLabelPipe,
		ImageSelectorComponent,
	],
	templateUrl: "./character-form.component.html",
})
export class CharacterFormComponent implements OnInit, ControlValueAccessor {
	@Input() public remainingAttributePoints?: number;
	@Input() public remainingSkillPoints?: number;

	protected characterForm = buildCharacterForm();
	protected readonly Labels = gameLabels;
	protected readonly Rules = gameRules;

	private readonly controlContainer = inject(ControlContainer);

	ngOnInit(): void {
		if (this.controlContainer.control?.value) {
			this.characterForm = this.controlContainer.control as ReturnType<typeof buildCharacterForm>;
		}
	}

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

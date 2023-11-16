import { inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { gameRules } from "../constants/game-rules";

const defaultAge = 10;

export const buildCharacterForm = () => {
	const formBuilder = inject(FormBuilder);

	return formBuilder.nonNullable.group({
		general: formBuilder.nonNullable.group({
			firstName: formBuilder.nonNullable.control(""),
			lastName: formBuilder.nonNullable.control(""),
			age: formBuilder.nonNullable.control(defaultAge, [Validators.min(gameRules.ageRange.min), Validators.max(gameRules.ageRange.max)]),
			luck: formBuilder.nonNullable.control(gameRules.computeLuck(defaultAge), Validators.min(0)),
			archetype: formBuilder.nonNullable.control(""),
			fetish: formBuilder.nonNullable.control(""),
			favoriteSong: formBuilder.nonNullable.control(""),
			problem: formBuilder.nonNullable.control(""),
			drive: formBuilder.nonNullable.control(""),
			pride: formBuilder.nonNullable.control(""),
			socle: formBuilder.nonNullable.control(""),
		}),
		// TODO : Add validation to ensure that the sum of attributes is equal to age
		attributes: formBuilder.nonNullable.group({
			body: formBuilder.nonNullable.control(0, [Validators.min(gameRules.attributeRange.min), Validators.max(gameRules.attributeRange.max)]),
			tech: formBuilder.nonNullable.control(0, [Validators.min(gameRules.attributeRange.min), Validators.max(gameRules.attributeRange.max)]),
			heart: formBuilder.nonNullable.control(0, [Validators.min(gameRules.attributeRange.min), Validators.max(gameRules.attributeRange.max)]),
			mind: formBuilder.nonNullable.control(0, [Validators.min(gameRules.attributeRange.min), Validators.max(gameRules.attributeRange.max)]),
		}),
		// TODO : Add validation to ensure that the sum of skills is equal to 10
		skills: formBuilder.nonNullable.group({
			agility: formBuilder.nonNullable.control(0, [Validators.min(gameRules.skillRange.min), Validators.max(gameRules.skillRange.max)]),
			strength: formBuilder.nonNullable.control(0, [Validators.min(gameRules.skillRange.min), Validators.max(gameRules.skillRange.max)]),
			sneak: formBuilder.nonNullable.control(0, [Validators.min(gameRules.skillRange.min), Validators.max(gameRules.skillRange.max)]),
			analyze: formBuilder.nonNullable.control(0, [Validators.min(gameRules.skillRange.min), Validators.max(gameRules.skillRange.max)]),
			tinker: formBuilder.nonNullable.control(0, [Validators.min(gameRules.skillRange.min), Validators.max(gameRules.skillRange.max)]),
			program: formBuilder.nonNullable.control(0, [Validators.min(gameRules.skillRange.min), Validators.max(gameRules.skillRange.max)]),
			charisma: formBuilder.nonNullable.control(0, [Validators.min(gameRules.skillRange.min), Validators.max(gameRules.skillRange.max)]),
			charm: formBuilder.nonNullable.control(0, [Validators.min(gameRules.skillRange.min), Validators.max(gameRules.skillRange.max)]),
			contact: formBuilder.nonNullable.control(0, [Validators.min(gameRules.skillRange.min), Validators.max(gameRules.skillRange.max)]),
			comprehend: formBuilder.nonNullable.control(0, [Validators.min(gameRules.skillRange.min), Validators.max(gameRules.skillRange.max)]),
			discover: formBuilder.nonNullable.control(0, [Validators.min(gameRules.skillRange.min), Validators.max(gameRules.skillRange.max)]),
			empathize: formBuilder.nonNullable.control(0, [Validators.min(gameRules.skillRange.min), Validators.max(gameRules.skillRange.max)]),
		}),
	});
};

import { FormControl } from "@angular/forms";
import { ControlsToKeyLabelPipe } from "./controls-to-keys-labels.pipe";

describe("ControlsToKeyLabelPipe", () => {
	let pipe: ControlsToKeyLabelPipe<string>;

	beforeEach(() => {
		pipe = new ControlsToKeyLabelPipe();
	});

	it("should create an instance", () => {
		expect(pipe).toBeTruthy();
	});

	it("should transform controls to key-label pairs", () => {
		const controls: Record<string, FormControl<string>> = {
			name: new FormControl("John", { nonNullable: true }),
			age: new FormControl("30", { nonNullable: true }),
			email: new FormControl("john@example.com", { nonNullable: true }),
		};
		const labels = {
			name: "Name",
			age: "Age",
			email: "Email",
		};
		const expected = [
			{ key: "age", label: "Age" },
			{ key: "email", label: "Email" },
			{ key: "name", label: "Name" },
		];

		expect(pipe.transform(controls, labels)).toEqual(expected);
	});

	it("should sort key-label pairs by label", () => {
		const controls: Record<string, FormControl<string>> = {
			name: new FormControl("John", { nonNullable: true }),
			age: new FormControl("30", { nonNullable: true }),
			email: new FormControl("john@example.com", { nonNullable: true }),
		};
		const labels = {
			name: "Name",
			age: "Age",
			email: "Email",
		};
		const expected = [
			{ key: "age", label: "Age" },
			{ key: "email", label: "Email" },
			{ key: "name", label: "Name" },
		];

		expect(pipe.transform(controls, labels)).toEqual(expected);
	});
});

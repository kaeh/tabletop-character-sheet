import { Pipe, PipeTransform } from "@angular/core";
import { FormControl } from "@angular/forms";

@Pipe({
	name: "kaehControlsToKeysLabels",
	standalone: true,
})
export class ControlsToKeyLabelPipe<T> implements PipeTransform {
	transform(value: Record<string, FormControl<T>>, labels: Record<string, string>): { key: string; label: string }[] {
		return Object.entries(value)
			.map((keyValue) => ({ key: keyValue[0], label: labels[keyValue[0]] }))
			.sort((left, right) => {
				const leftLabel = left.label;
				const rightLabel = right.label;

				return leftLabel.localeCompare(rightLabel);
			});
	}
}
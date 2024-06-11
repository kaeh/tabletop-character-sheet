import { CommonModule } from "@angular/common";
import { Component, Input, inject } from "@angular/core";
import { type ControlValueAccessor, FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { NoopValueAccessorDirective, injectNgControl } from "@utils";

@Component({
	selector: "app-image-selector",
	standalone: true,
	imports: [
		// Angular
		CommonModule,
		ReactiveFormsModule,
	],
	templateUrl: "./image-selector.component.html",
	hostDirectives: [NoopValueAccessorDirective],
})
export class ImageSelectorComponent implements ControlValueAccessor {
	@Input({ required: true }) public label!: string;

	protected readonly ngControl = injectNgControl();

	protected readonly tmpControl = inject(FormBuilder).control("");

	public writeValue(obj: unknown): void {
		console.log("writeValue", obj);
	}

	public registerOnChange(fn: unknown): void {
		console.log("registerOnChange", fn);
	}

	public registerOnTouched(fn: unknown): void {
		console.log("registerOnTouched", fn);
	}

	protected onImageChange(event: Event): void {
		const target = event.target as HTMLInputElement;
		if (target.files?.[0]) {
			const reader = new FileReader();
			reader.onload = () => {
				if (this.ngControl) {
					// this.ngControl.control.setValue(reader.result);
					this.tmpControl.setValue(reader.result as string);
				}
			};
			reader.readAsDataURL(target.files?.[0]);
		}
	}
}

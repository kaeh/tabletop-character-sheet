import { Directive } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

/**
 * @see https://netbasal.com/forwarding-form-controls-to-custom-control-components-in-angular-701e8406cc55
 */
@Directive({
	standalone: true,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			multi: true,
			useExisting: NoopValueAccessorDirective,
		},
	],
})
export class NoopValueAccessorDirective implements ControlValueAccessor {
	writeValue(_obj: unknown): void {}
	registerOnChange(_fn: unknown): void {}
	registerOnTouched(_fn: unknown): void {}
}

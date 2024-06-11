import { CommonModule, NgOptimizedImage } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";

@Component({
	selector: "app-game-card",
	standalone: true,
	imports: [
		// Angular
		CommonModule,
		NgOptimizedImage,
	],
	templateUrl: "./game-card.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameCardComponent {
	public readonly title = input.required<string>();
	public readonly image = input.required<string>();
	public readonly description = input.required<string>();
}

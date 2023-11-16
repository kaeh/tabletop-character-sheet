import { CommonModule, NgOptimizedImage } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

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
	@Input({ required: true }) title!: string;
	@Input({ required: true }) image!: string;
	@Input({ required: true }) description!: string;
}

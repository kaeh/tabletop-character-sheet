import { CommonModule, NgOptimizedImage } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
	selector: "kaeh-game-card",
	standalone: true,
	imports: [
		// Angular
		CommonModule,
		NgOptimizedImage,
	],
	templateUrl: "./game-card.component.html",
	styleUrls: ["./game-card.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameCardComponent {
	@Input({ required: true }) title!: string;
	@Input({ required: true }) image!: string;
	@Input({ required: true }) description!: string;
}

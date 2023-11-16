import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "appPartyImageFallback",
	standalone: true,
})
export class PartyImageFallbackPipe implements PipeTransform {
	transform(value: string | null | undefined, gameId: string): string {
		return value || `/assets/${gameId}/party-card-avatar-placeholder.jpg`;
	}
}

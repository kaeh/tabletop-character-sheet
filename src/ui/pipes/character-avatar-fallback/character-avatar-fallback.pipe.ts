import { Pipe, type PipeTransform } from "@angular/core";

@Pipe({
	name: "appCharacterAvatarFallback",
	standalone: true,
})
export class CharacterAvatarFallbackPipe implements PipeTransform {
	transform(value: string | null | undefined, gameId: string): string {
		return value || `/assets/${gameId}/character-card-avatar-placeholder.png`;
	}
}

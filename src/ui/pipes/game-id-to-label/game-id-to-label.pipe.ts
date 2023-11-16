import { Pipe, PipeTransform } from "@angular/core";
import { gameId as TalesFromTheLoopId } from "@features/games/tales-from-the-loop/src/constants/game-id";
import { gameLabels as TalesFromTheLoopLabel } from "@features/games/tales-from-the-loop/src/constants/game-labels";

const gameLabelsMap: Record<string, string> = {
	[TalesFromTheLoopId]: TalesFromTheLoopLabel.title,
};

@Pipe({
	name: "appGameIdToLabel",
	standalone: true,
})
export class GameIdToLabelPipe implements PipeTransform {
	public transform(gameId: string) {
		return gameLabelsMap[gameId];
	}
}

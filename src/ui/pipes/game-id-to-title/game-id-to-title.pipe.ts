import { Pipe, PipeTransform } from "@angular/core";
import { gameId as TalesFromTheLoopId } from "@features/games/tales-from-the-loop/src/constants/game-id";

@Pipe({
	name: "appGameIdToTitle",
	standalone: true,
})
export class GameIdToTitlePipe implements PipeTransform {
	public async transform(gameId: string) {
		return await this.importGameTitle(gameId);
	}

	public async importGameTitle(gameId: string) {
		let importPromise = null;
		switch (gameId) {
			case TalesFromTheLoopId:
				importPromise = import("@features/games/tales-from-the-loop/src/constants/game-labels");
				break;
		}

		return (await importPromise)?.gameLabels.title;
	}
}

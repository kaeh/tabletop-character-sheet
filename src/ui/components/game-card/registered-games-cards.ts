import { gameId as TalesFromTheLoopId } from "@features/games/tales-from-the-loop/src/constants/game-id";
import { gameLabels as TalesFromTheLoopLabel } from "@features/games/tales-from-the-loop/src/constants/game-labels";
import type { GameCard } from "./game-card.interface";

export const registeredGameCard: GameCard[] = [
	{
		id: TalesFromTheLoopId,
		title: TalesFromTheLoopLabel.title,
		image: "/assets/tales-from-the-loop/card-background2.jpg",
		description: "",
	},
];

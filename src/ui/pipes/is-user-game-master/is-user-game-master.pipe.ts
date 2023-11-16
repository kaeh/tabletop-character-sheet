import { Pipe, PipeTransform } from "@angular/core";
import { DocumentReference } from "@angular/fire/firestore";
import { injectUserId } from "@utils";

@Pipe({
	name: "appIsUserGameMaster",
	standalone: true,
})
export class IsUserGameMasterPipe implements PipeTransform {
	private readonly uid = injectUserId();

	transform(gameMaster: DocumentReference) {
		return this.uid === gameMaster.id;
	}
}

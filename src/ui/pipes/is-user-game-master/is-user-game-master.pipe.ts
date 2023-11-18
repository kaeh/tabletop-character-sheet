import { Pipe, PipeTransform, inject } from "@angular/core";
import { DocumentReference } from "@angular/fire/firestore";
import { UsersService } from "@stores";

@Pipe({
	name: "appIsUserGameMaster",
	standalone: true,
})
export class IsUserGameMasterPipe implements PipeTransform {
	private readonly _userService = inject(UsersService);

	transform(gameMaster: DocumentReference) {
		return this._userService.currentUserId === gameMaster.id;
	}
}

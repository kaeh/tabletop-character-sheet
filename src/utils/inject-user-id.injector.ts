import { inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

export const injectUserId = (): string => retrieveUid(inject(ActivatedRoute));

function retrieveUid(route: ActivatedRoute): string {
	if (!route.parent) {
		return route.snapshot.data["uid"] ?? "ERROR_UID_NOT_FOUND";
	}

	if (!route.parent.snapshot.data["uid"]) {
		return retrieveUid(route.parent);
	}

	return route.parent.snapshot.data["uid"];
}

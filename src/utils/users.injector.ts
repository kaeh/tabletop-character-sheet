import { inject } from "@angular/core";
import { Firestore, collection, collectionData } from "@angular/fire/firestore";
import { PersistedUser } from "@models";
import { map } from "rxjs";
import { injectUserId } from "./user-id.injector";

type UserWithId = PersistedUser & { id: string };

export const injectUsers = () => {
	const uid = injectUserId();

	return collectionData(collection(inject(Firestore), "users"), { idField: "id" }).pipe(
		map((users) => (users as UserWithId[]).filter(({ id }) => id !== uid).map(({ id, displayName }) => ({ id, displayName }))),
	);
};

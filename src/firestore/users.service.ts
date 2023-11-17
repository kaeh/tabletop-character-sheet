import { Injectable, inject } from "@angular/core";
import { Firestore, addDoc, arrayRemove, arrayUnion, collection, collectionData, doc, docData, query, updateDoc, where } from "@angular/fire/firestore";
import { PersistedCharacter } from "@features/games/tales-from-the-loop/src/models";
import { BasePersistedCharacter, BasePersistedParty, CharactersCollectionRef, PartyDocRef, PersistedUser, UserDocRef, UsersCollectionRef } from "@models";
import { injectUserId } from "@utils";
import { Observable, filter, map, of, switchMap, zip } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class UsersService {
	public readonly usersCollectionRef = collection(inject(Firestore), "users") as UsersCollectionRef;

	public readonly allUsers$ = collectionData(this.usersCollectionRef, { idField: "id" }) as Observable<PersistedUser[]>;

	public readonly currentUserId = injectUserId();
	public readonly currentUserDocRef = this.buildUserDocRef(this.currentUserId);
	public readonly currentUserCharacterCollectionRef = collection(this.currentUserDocRef, "characters") as CharactersCollectionRef;

	public readonly currentUser$ = docData(this.currentUserDocRef).pipe(filter((x): x is PersistedUser => !!x)) as Observable<PersistedUser>;
	public readonly currentUserAllCharacters$ = collectionData(this.currentUserCharacterCollectionRef, { idField: "id" }) as Observable<BasePersistedCharacter[]>;

	public readonly currentUserParties$ = this.currentUser$.pipe(
		map(({ parties }) => parties ?? []),
		map((x) => x.map((party) => docData(party, { idField: "id" }))),
		switchMap((x) => zip(x)),
		map((x) => x.filter((x): x is BasePersistedParty => !!x)),
	);

	public getUsers(ids: string[]): Observable<PersistedUser[]> {
		if (!ids?.length) {
			return of([]);
		}

		const q = query(this.usersCollectionRef, where("id", "in", ids));

		return collectionData(q, { idField: "id" }) as Observable<PersistedUser[]>;
	}

	public async addCharacterToUser(uid: string, characterDocRef: PersistedCharacter) {
		await addDoc(this._computeUserCharactersCollection(uid), characterDocRef);
	}

	public async addPartyToUser(uid: string, partyDocRef: PartyDocRef) {
		await updateDoc(this._computeUserDoc(uid), { parties: arrayUnion(partyDocRef) });
	}

	public async removePartyFromUser(uid: string, partyDocRef: PartyDocRef) {
		await updateDoc(this._computeUserDoc(uid), { parties: arrayRemove(partyDocRef) });
	}

	public buildUserDocRef(uid: string): UserDocRef {
		return doc(this.usersCollectionRef, uid);
	}

	public buildUserCharacterCollectionRef(uid: string): CharactersCollectionRef {
		return collection(this.usersCollectionRef, uid, "characters") as CharactersCollectionRef;
	}

	private _computeUserDoc(uid: string): UserDocRef {
		return uid === this.currentUserId ? this.currentUserDocRef : this.buildUserDocRef(uid);
	}

	private _computeUserCharactersCollection(uid: string): CharactersCollectionRef {
		return uid === this.currentUserId ? this.currentUserCharacterCollectionRef : this.buildUserCharacterCollectionRef(uid);
	}
}

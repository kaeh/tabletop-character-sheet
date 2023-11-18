import { Injectable, inject } from "@angular/core";
import { Auth, updateProfile } from "@angular/fire/auth";
import { Firestore, addDoc, arrayRemove, arrayUnion, collection, collectionData, deleteDoc, doc, docData, query, updateDoc, where } from "@angular/fire/firestore";
import { PersistedCharacter } from "@features/games/tales-from-the-loop/src/models";
import { BasePersistedCharacter, BasePersistedParty, CharacterDocRef, CharactersCollectionRef, PartyDocRef, PersistedUser, UserDocRef, UsersCollectionRef } from "@models";
import { Observable, filter, map, of, switchMap, zip } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class UsersService {
	public readonly usersCollectionRef = collection(inject(Firestore), "users") as UsersCollectionRef;

	public readonly allUsers$ = collectionData(this.usersCollectionRef, { idField: "id" }) as Observable<PersistedUser[]>;

	public readonly currentUser = inject(Auth).currentUser;
	public readonly currentUserId = this.currentUser?.uid ?? "ERROR_UID_NOT_FOUND";
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

	public async updateCurrentUser(user: Partial<PersistedUser>) {
		if (!this.currentUser) {
			throw new Error("No authenticated user");
		}

		const updateProfilePromise = updateProfile(this.currentUser, user);
		const updateUserDocPromise = updateDoc(this.currentUserDocRef, user);

		await Promise.all([updateProfilePromise, updateUserDocPromise]);
	}

	public getUser(uid: string): Observable<PersistedUser>;
	public getUser(uid: UserDocRef): Observable<PersistedUser>;
	public getUser(uid: string | UserDocRef) {
		const finalUid = typeof uid === "string" ? uid : uid.id;

		return docData(this._computeUserDoc(finalUid), { idField: "id" }) as Observable<PersistedUser>;
	}

	public getUsers(ids: string[]): Observable<PersistedUser[]> {
		if (!ids?.length) {
			return of([]);
		}

		const q = query(this.usersCollectionRef, where("id", "in", ids));

		return collectionData(q, { idField: "id" }) as Observable<PersistedUser[]>;
	}

	public getUserCharacter(uid: string, characterId: string) {
		const userCharactersCollectionRef = this._computeUserCharactersCollection(uid);
		const characterDocRef = doc(userCharactersCollectionRef, characterId) as CharacterDocRef;

		return docData(characterDocRef);
	}

	public getUserCharactersByGame(uid: string, gameId: string) {
		const userCharactersCollectionRef = this._computeUserCharactersCollection(uid);
		const q = query(userCharactersCollectionRef, where("gameId", "==", gameId));

		return collectionData(q, { idField: "id" }) as Observable<PersistedCharacter[]>;
	}

	public async addCharacterToCurrentUser(characterDocRef: PersistedCharacter) {
		await addDoc(this.currentUserCharacterCollectionRef, characterDocRef);
	}

	public async deleteCharacterFromCurrentUser(characterId: string) {
		const characterDocRef = doc(this.currentUserCharacterCollectionRef, characterId);
		await deleteDoc(characterDocRef);
	}

	public async addPartyToUser(uid: string, partyDocRef: PartyDocRef) {
		await updateDoc(this._computeUserDoc(uid), { parties: arrayUnion(partyDocRef) });
	}

	public async removePartyFromUser(uid: string, partyDocRef: PartyDocRef) {
		await updateDoc(this._computeUserDoc(uid), { parties: arrayRemove(partyDocRef) });
	}

	public currentUserHasAccessToParty(partyId: string) {
		return this.currentUser$.pipe(map(({ parties }) => parties?.some(({ id }) => id === partyId) ?? false));
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

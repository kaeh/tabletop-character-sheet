import { Injectable } from "@angular/core";
import { PersistedCharacter } from "src/app/interfaces/persistence/persisted-character.interface";

@Injectable({
    providedIn: 'root'
})
export class CharacterPersisterService {
    public saveProperty(characterUniqKey: string, propKey: string, propValue: unknown): void {
        const localStorageObject = this.get(characterUniqKey);
        (localStorageObject as any)[propKey] = propValue;
        localStorage.setItem(characterUniqKey, JSON.stringify(localStorageObject));
    }

    public get(characterUniqKey: string): PersistedCharacter {
        const localStorageValue = localStorage.getItem(characterUniqKey);
        return localStorageValue ? JSON.parse(localStorageValue) : {};
    }
}
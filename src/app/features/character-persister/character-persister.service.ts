import { Injectable } from "@angular/core";
import { PersistedCharacter } from "src/app/interfaces/persistence/persisted-character.interface";

@Injectable({
    providedIn: 'root'
})
export class CharacterPersisterService {
    public saveProperty(characterUniqKey: string, savedProperty: { key: string, value: unknown }): void {
        const localStorageObject = this.get(characterUniqKey);
        (localStorageObject as any)[savedProperty.key] = savedProperty.value;
        localStorage.setItem(characterUniqKey, JSON.stringify(localStorageObject));
    }

    public get(characterUniqKey: string): PersistedCharacter {
        const localStorageValue = localStorage.getItem(characterUniqKey);
        return localStorageValue ? JSON.parse(localStorageValue) : {};
    }
}
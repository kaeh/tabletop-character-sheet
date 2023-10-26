import { Injectable } from "@angular/core";
import { PersistedCharacter, PersistedCharacterList } from "@models/persistence/persisted-character.interface";
import { LocalStorageConfigs } from "./local-storage-configs";

@Injectable({
    providedIn: 'root'
})
export class CharacterPersisterService {
    public exists(characterUniqKey: string): boolean {
        return !!localStorage.getItem(`${LocalStorageConfigs.characterPrefix}${characterUniqKey}`);
    }

    public saveProperty(characterUniqKey: string, propKey: string, propValue: unknown): void {
        const localStorageObject = this.get(characterUniqKey);
        const localStorageKey = `${LocalStorageConfigs.characterPrefix}${characterUniqKey}`;

        (localStorageObject as any)[propKey] = propValue;
        localStorage.setItem(localStorageKey, JSON.stringify(localStorageObject));

        localStorage.setItem(LocalStorageConfigs.lastUpdatedCharacterKey, localStorageKey);

        console.log(`Saved ${propKey} for character ${characterUniqKey}`);
        console.log(`Last updated character is ${characterUniqKey}`);
    }

    public get(characterUniqKey: string): PersistedCharacter {
        const localStorageKey = `${LocalStorageConfigs.characterPrefix}${characterUniqKey}`;
        const localStorageValue = localStorage.getItem(localStorageKey) ?? "{}";

        return JSON.parse(localStorageValue);
    }

    public getAll(): PersistedCharacterList {
        return Object.keys(localStorage)
            .filter((key) => key.startsWith(LocalStorageConfigs.characterPrefix))
            .map((key) => {
                const uniqKey = key.replace(LocalStorageConfigs.characterPrefix, '');
                const character = this.get(uniqKey);

                return { character, uniqKey };
            });
    }
}
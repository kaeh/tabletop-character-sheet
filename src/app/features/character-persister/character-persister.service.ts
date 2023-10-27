import { Injectable, signal } from "@angular/core";
import { PersistedCharacter, PersistedCharacterList, PersistedCharacterPropertyKey } from "@models/persistence/persisted-character.interface";
import { LocalStorageConfigs } from "./local-storage-configs";

const keyContainsCharacter = (key: string) => key.startsWith(LocalStorageConfigs.characterPrefix);

@Injectable({
    providedIn: 'root'
})
export class CharacterPersisterService {
    private readonly allCharacters = signal<PersistedCharacterList>(new Map());

    public exists(characterUniqKey: string): boolean {
        return !!localStorage.getItem(`${LocalStorageConfigs.characterPrefix}${characterUniqKey}`);
    }

    public hasCharacters(): boolean {
        return Object.keys(localStorage)
            .some(keyContainsCharacter);
    }

    public saveProperty(characterUniqKey: string, propKey: PersistedCharacterPropertyKey, propValue: unknown): void {
        const localStorageObject = this.get(characterUniqKey);
        const localStorageKey = `${LocalStorageConfigs.characterPrefix}${characterUniqKey}`;

        (localStorageObject as any)[propKey] = propValue;
        localStorage.setItem(localStorageKey, JSON.stringify(localStorageObject));

        this.allCharacters().set(characterUniqKey, localStorageObject);
    }

    public get(characterUniqKey: string): PersistedCharacter {
        const localStorageKey = `${LocalStorageConfigs.characterPrefix}${characterUniqKey}`;
        const localStorageValue = localStorage.getItem(localStorageKey) ?? "{}";

        return JSON.parse(localStorageValue);
    }

    public getAll(): PersistedCharacterList {
        if (this.allCharacters().size === 0) {
            const allCharacters = new Map<string, PersistedCharacter>();

            Object.keys(localStorage)
                .filter(keyContainsCharacter)
                .forEach((key: string) => {
                    const characterUniqKey = key.replace(LocalStorageConfigs.characterPrefix, '');
                    const character = this.get(characterUniqKey);

                    allCharacters.set(characterUniqKey, character);
                });

            this.allCharacters.set(allCharacters);
        }

        return this.allCharacters();
    }
}
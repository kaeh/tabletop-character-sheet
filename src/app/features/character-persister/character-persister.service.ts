import { Injectable, signal } from "@angular/core";
import { PersistedCharacter, PersistedCharacterList, PersistedCharacterPropertyKey } from "@models/persistence/persisted-character.interface";
import { v4 as uuidv4, validate } from 'uuid';
import { LocalStorageConfigs } from "./local-storage-configs";

const keyContainsCharacter = (key: string) => key.startsWith(LocalStorageConfigs.characterPrefix);

@Injectable({
    providedIn: 'root'
})
export class CharacterPersisterService {
    private readonly allCharacters = signal<PersistedCharacterList>(new Map());

    public exists(characterUniqKey: string): boolean {
        return !!localStorage.getItem(`${LocalStorageConfigs.characterPrefix}${characterUniqKey}`) && validate(characterUniqKey);
    }

    public anyExists(): boolean {
        return Object.keys(localStorage).some(keyContainsCharacter);
    }

    public createCharacter(): string {
        const uniqKey = uuidv4();
        this.saveProperty(uniqKey, 'name', LocalStorageConfigs.defaultCharacterName);

        return uniqKey;
    }

    public saveProperty(characterUniqKey: string, propKey: PersistedCharacterPropertyKey, propValue: unknown): void {
        const localStorageObject = this.get(characterUniqKey);
        const localStorageKey = `${LocalStorageConfigs.characterPrefix}${characterUniqKey}`;

        (localStorageObject as any)[propKey] = propValue;
        localStorage.setItem(localStorageKey, JSON.stringify(localStorageObject));

        this.allCharacters().set(characterUniqKey, localStorageObject);
        localStorage.setItem(LocalStorageConfigs.lastUpdatedKey, characterUniqKey);
    }

    public get(characterUniqKey: string): PersistedCharacter {
        const localStorageKey = `${LocalStorageConfigs.characterPrefix}${characterUniqKey}`;
        const localStorageValue = localStorage.getItem(localStorageKey) ?? "{}";

        return JSON.parse(localStorageValue);
    }

    public getLastUpdatedUniqKey(): string | undefined {
        const lastUpdatedCharacterUniqKey = localStorage.getItem(LocalStorageConfigs.lastUpdatedKey);

        return lastUpdatedCharacterUniqKey && this.exists(lastUpdatedCharacterUniqKey) ? lastUpdatedCharacterUniqKey : undefined;
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

    public delete(characterUniqKeys: string[]): void {
        characterUniqKeys.forEach((characterUniqKey) => this.deleteOne(characterUniqKey));
    }

    public deleteOne(characterUniqKey: string): void {
        const localStorageKey = `${LocalStorageConfigs.characterPrefix}${characterUniqKey}`;

        localStorage.removeItem(localStorageKey);

        this.allCharacters().delete(characterUniqKey);

        if (localStorage.getItem(LocalStorageConfigs.lastUpdatedKey) === characterUniqKey) {
            localStorage.removeItem(LocalStorageConfigs.lastUpdatedKey);
        }
    }
}
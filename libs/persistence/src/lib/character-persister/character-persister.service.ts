import { Injectable, signal } from '@angular/core';
import { Parsable } from '@kaeh/models';
import { v4 as uuidv4, validate } from 'uuid';
import {
  PersistedCharacter,
  PersistedCharacterList,
  PersistedCharacterPropertyKey,
} from './persisted-character.interface';
import { PersisterConfigs } from './persister-config';

const keyContainsCharacter = (key: string) =>
  key.startsWith(PersisterConfigs.characterPrefix);

@Injectable({
  providedIn: 'root',
})
export class CharacterPersisterService {
  private readonly allCharacters = signal<PersistedCharacterList>(new Map());

  public exists(characterUniqKey: string): boolean {
    return (
      !!localStorage.getItem(
        `${PersisterConfigs.characterPrefix}${characterUniqKey}`
      ) && validate(characterUniqKey)
    );
  }

  public anyExists(): boolean {
    return Object.keys(localStorage).some(keyContainsCharacter);
  }

  public createCharacter(): string {
    const uniqKey = uuidv4();
    this.saveProperty(uniqKey, 'name', PersisterConfigs.defaultCharacterName);

    return uniqKey;
  }

  public saveProperty(
    characterUniqKey: string,
    propKey: PersistedCharacterPropertyKey,
    propValue: unknown
  ): void {
    const localStorageObject = this.get(characterUniqKey);
    const localStorageKey = `${PersisterConfigs.characterPrefix}${characterUniqKey}`;

    (localStorageObject as unknown as Parsable)[propKey] = propValue;
    localStorage.setItem(localStorageKey, JSON.stringify(localStorageObject));

    this.allCharacters().set(characterUniqKey, localStorageObject);
    localStorage.setItem(PersisterConfigs.lastUpdatedKey, characterUniqKey);
  }

  public get(characterUniqKey: string): PersistedCharacter {
    const localStorageKey = `${PersisterConfigs.characterPrefix}${characterUniqKey}`;
    const localStorageValue = localStorage.getItem(localStorageKey) ?? '{}';

    return JSON.parse(localStorageValue);
  }

  public getLastUpdatedUniqKey(): string | undefined {
    const lastUpdatedCharacterUniqKey = localStorage.getItem(
      PersisterConfigs.lastUpdatedKey
    );

    return lastUpdatedCharacterUniqKey &&
      this.exists(lastUpdatedCharacterUniqKey)
      ? lastUpdatedCharacterUniqKey
      : undefined;
  }

  public getAll(): PersistedCharacterList {
    if (this.allCharacters().size === 0) {
      const allCharacters = new Map<string, PersistedCharacter>();

      Object.keys(localStorage)
        .filter(keyContainsCharacter)
        .forEach((key: string) => {
          const characterUniqKey = key.replace(
            PersisterConfigs.characterPrefix,
            ''
          );
          const character = this.get(characterUniqKey);

          allCharacters.set(characterUniqKey, character);
        });

      this.allCharacters.set(allCharacters);
    }

    return this.allCharacters();
  }

  public delete(characterUniqKeys: string[]): void {
    characterUniqKeys.forEach((characterUniqKey) =>
      this.deleteOne(characterUniqKey)
    );
  }

  public deleteOne(characterUniqKey: string): void {
    const localStorageKey = `${PersisterConfigs.characterPrefix}${characterUniqKey}`;

    localStorage.removeItem(localStorageKey);

    this.allCharacters().delete(characterUniqKey);

    if (
      localStorage.getItem(PersisterConfigs.lastUpdatedKey) === characterUniqKey
    ) {
      localStorage.removeItem(PersisterConfigs.lastUpdatedKey);
    }
  }
}

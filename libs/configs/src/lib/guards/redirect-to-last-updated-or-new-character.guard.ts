import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CharacterPersisterService } from '@kaeh/persistence';

/**
 * Returns a CanActivate function that redirects to the last updated character or a new character if none exist.
 * @param characterSheetRoutePath - The route path for the character sheet.
 * @returns A CanActivate function that redirects to the last updated character or a new character if none exist.
 */
export const redirectToLastUpdatedOrNewCharacter =
  (characterSheetRoutePath: string): CanActivateFn =>
  () => {
    const characterPersisterService = inject(CharacterPersisterService);
    const uniqKey = characterPersisterService.getLastUpdatedUniqKey() || characterPersisterService.createCharacter();

    return inject(Router).parseUrl(`${characterSheetRoutePath}/${uniqKey}`);
  };

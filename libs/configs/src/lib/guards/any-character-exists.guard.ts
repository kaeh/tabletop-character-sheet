import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CharacterPersisterService } from '@kaeh/persistence';

/**
 * Returns a CanActivateFn that checks if any character exists in the CharacterPersisterService.
 * If no character exists, it redirects to the specified path.
 * @param redirectPath - The path to redirect to if no character exists.
 * @returns A CanActivateFn that checks if any character exists in the CharacterPersisterService.
 */
export const anyCharacterExists =
  (redirectPath: string): CanActivateFn =>
  () =>
    inject(CharacterPersisterService).anyExists() || inject(Router).parseUrl(redirectPath);

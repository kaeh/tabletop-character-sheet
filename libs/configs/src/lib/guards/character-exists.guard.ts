import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { CharacterPersisterService } from '@kaeh/persistence';
import { RoutesConfigs } from '../routes-configs';

/**
 * Returns a CanActivateFn that checks if a character exists in the CharacterPersisterService.
 * If the character does not exist, it redirects to the specified characterSheetRoutePath.
 * @param characterSheetRoutePath - The route path to redirect to if the character does not exist.
 * @returns A CanActivateFn that checks if a character exists in the CharacterPersisterService.
 */
export const characterExists =
  (characterSheetRoutePath: string): CanActivateFn =>
  (route: ActivatedRouteSnapshot) => {
    const characterPersisterService = inject(CharacterPersisterService);
    const uniqKey = route.params[RoutesConfigs.characterSheet.uniqKey];

    if (uniqKey && !characterPersisterService.exists(uniqKey)) {
      return inject(Router).parseUrl(characterSheetRoutePath);
    }

    return true;
  };

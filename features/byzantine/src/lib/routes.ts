import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router } from '@angular/router';
import { RoutesConfigs } from '@kaeh/configs';
import { CharacterPersisterService } from '@kaeh/persistence';

export const routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: RoutesConfigs.charactersList,
  },
  {
    path: `${RoutesConfigs.charactersList}`,
    loadComponent: () =>
      import('./components/characters-list/characters-list.component').then(
        (m) => m.CharactersListComponent
      ),
    canActivate: [
      // If any character exists, continue
      // Else create a new character
      () =>
        inject(CharacterPersisterService).anyExists() ||
        inject(Router).parseUrl(`/${RoutesConfigs.characterSheet.path}`),
    ],
  },
  {
    path: `${RoutesConfigs.characterSheet.path}`,
    title: () => 'Feuille de personnage',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/character-sheet/character-sheet.component').then(
            (m) => m.CharacterSheetComponent
          ),
        canActivate: [
          // If there is a last updated character, redirect to it
          // Else create a new character
          () => {
            const characterPersisterService = inject(CharacterPersisterService);
            const uniqKey =
              characterPersisterService.getLastUpdatedUniqKey() ||
              characterPersisterService.createCharacter();

            return inject(Router).parseUrl(
              `/${RoutesConfigs.characterSheet.path}/${uniqKey}`
            );
          },
        ],
      },
      {
        path: `:${RoutesConfigs.characterSheet.uniqKey}`,
        loadComponent: () =>
          import('./components/character-sheet/character-sheet.component').then(
            (m) => m.CharacterSheetComponent
          ),
        canActivate: [
          // Prevent accessing a non-existing character and create a new one instead
          (route: ActivatedRouteSnapshot) => {
            const characterPersisterService = inject(CharacterPersisterService);
            const uniqKey = route.params[RoutesConfigs.characterSheet.uniqKey];

            if (uniqKey && !characterPersisterService.exists(uniqKey)) {
              return inject(Router).parseUrl(
                `/${RoutesConfigs.characterSheet.path}`
              );
            }

            return true;
          },
        ],
      },
    ],
  },
] as Route[];

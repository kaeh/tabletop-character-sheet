import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router } from '@angular/router';
import { v4 as uuidv4, validate } from 'uuid';
import { CharacterPersisterService } from './features/character-persister/character-persister.service';

export const RoutesConfigs = {
    characterSheet: {
        path: 'character-sheet',
        uniqKey: 'uniqKey',
    },
}

export const appRoutes: Route[] = [
    {
        path: `${RoutesConfigs.characterSheet.path}`,
        title: () => 'Feuille de personnage',
        children: [
            {
                path: '',
                loadComponent: () => import('./features/character-sheet/character-sheet.component').then(m => m.CharacterSheetComponent),
                canActivate: [
                    // If there is a last updated character, redirect to it
                    // Else create a new character
                    () => {
                        const characterPersisterService = inject(CharacterPersisterService);
                        const uniqKey = characterPersisterService.getLastUpdated() || uuidv4();

                        return inject(Router).parseUrl(`/${RoutesConfigs.characterSheet.path}/${uniqKey}`);
                    }
                ]
            },
            {
                path: `:${RoutesConfigs.characterSheet.uniqKey}`,
                loadComponent: () => import('./features/character-sheet/character-sheet.component').then(m => m.CharacterSheetComponent),
                canActivate: [
                    // Prevent accessing a non-existing character and create a new one instead
                    (route: ActivatedRouteSnapshot) => {
                        const characterPersisterService = inject(CharacterPersisterService);
                        const uniqKey = route.params[RoutesConfigs.characterSheet.uniqKey];

                        if (uniqKey && !characterPersisterService.exists(uniqKey) && !validate(uniqKey)) {
                            return inject(Router).parseUrl(`/${RoutesConfigs.characterSheet.path}`)
                        }

                        return true;
                    }
                ]
            }
        ]
    },
    {
        path: '**',
        redirectTo: RoutesConfigs.characterSheet.path,
    }
];
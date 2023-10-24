import { inject } from '@angular/core';
import { Route } from '@angular/router';
import { CharacterFetcherService } from './features/character-fetcher/character-fetcher.service';


export const appRoutes: Route[] = [
    {
        path: 'character-sheet',
        loadComponent: () => import('./features/character-sheet/character-sheet.component').then(m => m.CharacterSheetComponent),
        title: () => 'Character Sheet',
        resolve: {
            character: () => inject(CharacterFetcherService).fetch()
        }
    },
    {
        path: '**',
        redirectTo: 'character-sheet',
    }
];

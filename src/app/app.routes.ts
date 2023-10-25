import { Route } from '@angular/router';


export const appRoutes: Route[] = [
    {
        path: 'character-sheet',
        loadComponent: () => import('./features/character-sheet/character-sheet.component').then(m => m.CharacterSheetComponent),
        title: () => 'Character Sheet',
    },
    {
        path: '**',
        redirectTo: 'character-sheet',
    }
];

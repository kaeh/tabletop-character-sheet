import { Route } from '@angular/router';
import { RoutesConfigs } from '@kaeh/configs';

export const appRoutes: Route[] = [
    { path: 'byzantine', loadChildren: () => import('@kaeh/features/byzantine').then(m => m.routes) },
    {
        path: '**',
        redirectTo: RoutesConfigs.characterSheet.path,
    }
];
import { Route } from '@angular/router';
import { RoutesConfigs } from '@kaeh/configs';

export const appRoutes: Route[] = [
  {
    path: RoutesConfigs.gamesList,
    loadComponent: () => import('@kaeh/features/games-list').then((m) => m.GamesListComponent),
  },
  {
    path: RoutesConfigs.brigandine,
    loadChildren: () => import('@kaeh/features/brigandine').then((m) => m.routes),
  },
  {
    path: '**',
    redirectTo: RoutesConfigs.gamesList,
    pathMatch: 'full',
  },
];

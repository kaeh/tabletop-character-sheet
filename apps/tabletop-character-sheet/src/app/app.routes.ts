import { Route } from '@angular/router';
import { RoutesConfigs } from '@kaeh/configs';

export const appRoutes: Route[] = [
  {
    path: RoutesConfigs.gamesList,
    loadComponent: () =>
      import('@kaeh/features/games-list').then((m) => m.GamesListComponent),
  },
  {
    path: RoutesConfigs.byzantine,
    loadChildren: () =>
      import('@kaeh/features/byzantine').then((m) => m.routes),
  },
  {
    path: '**',
    redirectTo: RoutesConfigs.gamesList,
    pathMatch: 'full',
  },
];

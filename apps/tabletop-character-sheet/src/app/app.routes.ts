import { Route } from '@angular/router';
import { RoutesConfigs } from '@kaeh/configs';

export const appRoutes: Route[] = [
  {
    path: RoutesConfigs.characterCreation,
    loadChildren: () => import('@kaeh/features/character-creation').then((m) => m.characterCreationRoutes),
  },
  // {
  //   path: '',
  //   children: [
  //     {
  //       path: RoutesConfigs.characterCreation,
  //       loadChildren: () => import('@kaeh/features/character-creation').then((m) => m.characterCreationRoutes),
  //     },
  //     {
  //       path: RoutesConfigs.gamesList,
  //       loadComponent: () => import('@kaeh/features/games-list').then((m) => m.GamesListComponent),
  //     },
  //     {
  //       path: RoutesConfigs.brigandine,
  //       loadChildren: () => import('@kaeh/features/brigandine').then((m) => m.routes),
  //     },
  //     {
  //       path: RoutesConfigs.talesFromTheLoop,
  //       loadChildren: () => import('@kaeh/features/tales-from-the-loop').then((m) => m.routes),
  //     },
  //   ],
  // },
  {
    path: '**',
    redirectTo: RoutesConfigs.characterCreation,
    pathMatch: 'full',
  },
];

import { Route } from '@angular/router';
import { RoutesConfigs } from '@kaeh/configs';
import { CharacterCreationRouteData } from './character-creation-route-data.interface';

const baseTitle = 'Création de personnage';

export const characterCreationRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./character-creation.component').then((m) => m.CharacterCreationComponent),
    title: `${baseTitle}`,
  },
  {
    path: RoutesConfigs.brigandine,
    loadComponent: () => import('@kaeh/features/brigandine').then((m) => m.BrigandineCharacterCreationComponent),
    title: `${baseTitle} - Brigandine`,
    data: {
      card: {
        title: 'Brigandine',
        image: 'assets/brigandine/brigandine.jpg',
      },
    } as CharacterCreationRouteData,
  },
  {
    path: RoutesConfigs.talesFromTheLoop,
    loadComponent: () => import('@kaeh/features/tales-from-the-loop').then((m) => m.TalesFromTheLoopCharacterCreationComponent),
    title: `${baseTitle} - Tales from the Loop`,
    data: {
      card: {
        title: 'Tales from the Loop',
        image: 'assets/tales-from-the-loop/tales-from-the-loop.jpg',
      },
    } as CharacterCreationRouteData,
  },
];

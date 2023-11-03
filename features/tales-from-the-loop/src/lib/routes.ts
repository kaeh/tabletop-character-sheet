import { Route } from '@angular/router';
import { RoutesConfigs, anyCharacterExists, characterExists, redirectToLastUpdatedOrNewCharacter } from '@kaeh/configs';

const CharacterSheetFullPath = `${RoutesConfigs.talesFromTheLoop}/${RoutesConfigs.characterSheet.path}`;

export const routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: RoutesConfigs.charactersList,
  },
  {
    path: RoutesConfigs.charactersList,
    loadComponent: () => import('./characters-list/characters-list.component').then((m) => m.CharactersListComponent),
    canActivate: [anyCharacterExists(`/${CharacterSheetFullPath}`)],
  },
  {
    path: RoutesConfigs.characterSheet.path,
    title: () => 'Feuille de personnage',
    children: [
      {
        path: '',
        loadComponent: () => import('./character-sheet/character-sheet.component').then((m) => m.CharacterSheetComponent),
        canActivate: [redirectToLastUpdatedOrNewCharacter(`/${CharacterSheetFullPath}`)],
      },
      {
        path: `:${RoutesConfigs.characterSheet.uniqKey}`,
        loadComponent: () => import('./character-sheet/character-sheet.component').then((m) => m.CharacterSheetComponent),
        canActivate: [characterExists(`/${CharacterSheetFullPath}`)],
      },
    ],
  },
] as Route[];

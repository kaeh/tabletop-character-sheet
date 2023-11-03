import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RoutesConfigs } from '@kaeh/configs';
import {
  CharacterPersisterService,
  PersistedCharacterList,
} from '@kaeh/persistence';

@Component({
  selector: 'kaeh-characters-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
})
export class CharactersListComponent {
  protected readonly charactersList: PersistedCharacterList = inject(
    CharacterPersisterService
  ).getAll();
  protected readonly characterSheetRoute = `/${RoutesConfigs.brigandine}/${RoutesConfigs.characterSheet.path}`;

  private readonly router = inject(Router);
  private readonly characterPersisterService = inject(
    CharacterPersisterService
  );

  protected navigateToCharacterCreation(): void {
    const uniqKey = this.characterPersisterService.createCharacter();
    this.router.navigate([
      '/',
      RoutesConfigs.brigandine,
      RoutesConfigs.characterSheet.path,
      uniqKey,
    ]);
  }
}

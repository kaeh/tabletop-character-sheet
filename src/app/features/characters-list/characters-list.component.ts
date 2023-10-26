import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PersistedCharacterList } from '@models/persistence/persisted-character.interface';
import { RoutesConfigs } from 'src/app/app.routes';
import { CharacterPersisterService } from '../character-persister/character-persister.service';

@Component({
  selector: 'app-characters-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
})
export class CharactersListComponent {
  protected readonly charactersList: PersistedCharacterList = inject(CharacterPersisterService).getAll();
  protected readonly characterSheetRoute = RoutesConfigs.characterSheet.path;

  private readonly router = inject(Router);

  protected navigateToCharacterCreation(): void {
    this.router.navigate(['/', RoutesConfigs.characterSheet.path]);
  }
}

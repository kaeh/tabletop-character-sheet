import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RoutesConfigs } from '@kaeh/configs';
import { extractTensDigit } from '@kaeh/functions';
import { Parsable } from '@kaeh/models';
import {
  CharacterPersisterService,
  PersistedCharacter,
  PersistedCharacterPropertyKey,
  PersistedSkill,
  PersisterConfigs,
} from '@kaeh/persistence';
import { distinctUntilChanged, map, tap } from 'rxjs';
import { Skill } from '../../models/skill.interface';
import { Brigandine } from '../../rules';
import { CharactersListComponent } from '../characters-list/characters-list.component';
import { SkillComponent } from '../skill/skill.component';
import { VariableCharacteristicComponent } from '../variable-characteristic/variable-characteristic.component';

@Component({
  selector: 'kaeh-character-sheet',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    VariableCharacteristicComponent,
    SkillComponent,
    RouterModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatButtonModule,
    MatInputModule,
    MatTooltipModule,
    CharactersListComponent,
  ],
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterSheetComponent {
  protected readonly name = new FormControl<string>('', { nonNullable: true });

  protected readonly skills = {
    combat: new Skill(),
    knowledge: new Skill(),
    stealth: new Skill(),
    endurance: new Skill(),
    strength: new Skill(),
    dexterity: new Skill(),
    magic: new Skill(),
    movement: new Skill(),
    perception: new Skill(),
    sociability: new Skill(),
    survival: new Skill(),
    shooting: new Skill(),
    willpower: new Skill(),
  };

  protected readonly vitality = {
    current: signal(0),
    max: computed(() =>
      Brigandine.character.computeMaxVitality(
        this.skills.strength.level(),
        this.skills.endurance.level(),
        this.skills.willpower.level()
      )
    ),
  };
  protected readonly coldBlood = {
    current: signal(0),
    max: computed(() =>
      Brigandine.character.computeMaxColdBlood(
        this.skills.willpower.level(),
        this.skills.knowledge.level(),
        this.skills.combat.level()
      )
    ),
  };
  protected readonly initiative = computed(() =>
    Brigandine.character.computeInitiative(
      extractTensDigit(this.skills.combat.level()),
      extractTensDigit(this.skills.movement.level()),
      extractTensDigit(this.skills.perception.level())
    )
  );

  @ViewChild(MatSidenav)
  private matSideNav?: MatSidenav;

  private characterUniqueKey!: string;
  private readonly characterPersisterService = inject(
    CharacterPersisterService
  );
  private readonly router = inject(Router);

  constructor() {
    inject(ActivatedRoute)
      .params.pipe(
        tap(() => this.matSideNav?.close()),
        takeUntilDestroyed()
      )
      .subscribe((params) =>
        this.initCharacter(params[RoutesConfigs.characterSheet.uniqKey])
      );

    this.initPersistency();
  }

  protected deleteCharacter(): void {
    this.characterPersisterService.deleteOne(this.characterUniqueKey);
    this.router.navigate(['/', RoutesConfigs.charactersList]);
  }

  protected trimCharacterName(): void {
    this.name.setValue(this.name.value.trim());
  }

  private initCharacter(uniqKey: string): void {
    this.characterUniqueKey = uniqKey;
    const persistedCharacter = this.characterPersisterService.get(
      this.characterUniqueKey
    );

    this.name.setValue(persistedCharacter.name);

    this.updateSkills(persistedCharacter);

    this.vitality.current.set(persistedCharacter.vitality ?? 0);
    this.coldBlood.current.set(persistedCharacter.coldBlood ?? 0);
  }

  private updateSkills(persistedCharacter: PersistedCharacter): void {
    Object.entries(this.skills).forEach(
      ([skillKey, skill]: [string, Skill]) => {
        const persistedSkill: PersistedSkill | null | undefined = (
          persistedCharacter as unknown as Parsable<PersistedSkill>
        )[skillKey];

        const { base = 0, currentProgression = 0 } = persistedSkill ?? {};
        skill.base.set(base);
        skill.progression.current.set(currentProgression);
      }
    );
  }

  private initPersistency(): void {
    this.name.valueChanges
      .pipe(
        distinctUntilChanged(),
        map(PersisterConfigs.defaultNameIfEmpty),
        // Ensure stored name is the same as the displayed one
        tap((name) => this.name.setValue(name, { emitEvent: false })),
        tap((name) =>
          this.characterPersisterService.saveProperty(
            this.characterUniqueKey,
            'name',
            name
          )
        ),
        takeUntilDestroyed()
      )
      .subscribe();

    effect(() =>
      this.characterPersisterService.saveProperty(
        this.characterUniqueKey,
        'vitality',
        this.vitality.current()
      )
    );
    effect(() =>
      this.characterPersisterService.saveProperty(
        this.characterUniqueKey,
        'coldBlood',
        this.coldBlood.current()
      )
    );

    // Init skills persistence
    Object.keys(this.skills).forEach((skillKey) => {
      const skill = (this.skills as Record<string, Skill>)[skillKey];
      effect(() =>
        this.characterPersisterService.saveProperty(
          this.characterUniqueKey,
          skillKey as PersistedCharacterPropertyKey,
          {
            base: skill.base(),
            currentProgression: skill.progression.current(),
          }
        )
      );
    });
  }
}

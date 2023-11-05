import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, ViewChild, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSidenav, MatSidenavModule } from "@angular/material/sidenav";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { RoutesConfigs } from "@kaeh/configs";
import { CharacterPersisterService, PersisterConfigs } from "@kaeh/persistence";
import { distinctUntilChanged, map, tap } from "rxjs";
import { CharactersListComponent } from "../characters-list/characters-list.component";

@Component({
	selector: "kaeh-character-sheet",
	standalone: true,
	imports: [CommonModule, MatIconModule, RouterModule, ReactiveFormsModule, MatSidenavModule, MatButtonModule, MatInputModule, MatTooltipModule, CharactersListComponent],
	templateUrl: "./character-sheet.component.html",
	styleUrls: ["./character-sheet.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterSheetComponent {
	protected readonly name = new FormControl<string>("", { nonNullable: true });

	protected readonly skills = {};

	@ViewChild(MatSidenav)
	private matSideNav?: MatSidenav;

	private characterUniqueKey!: string;
	private readonly characterPersisterService = inject(CharacterPersisterService);
	private readonly router = inject(Router);

	constructor() {
		inject(ActivatedRoute)
			.params.pipe(
				tap(() => this.matSideNav?.close()),
				takeUntilDestroyed(),
			)
			.subscribe((params) => this.initCharacter(params[RoutesConfigs.characterSheet.uniqKey]));

		this.initPersistency();
	}

	protected deleteCharacter(): void {
		this.characterPersisterService.deleteOne(this.characterUniqueKey);
		this.router.navigate(["/", RoutesConfigs.talesFromTheLoop]);
	}

	protected trimCharacterName(): void {
		this.name.setValue(this.name.value.trim());
	}

	private initCharacter(uniqKey: string): void {
		this.characterUniqueKey = uniqKey;
		const persistedCharacter = this.characterPersisterService.get(this.characterUniqueKey);

		this.name.setValue(persistedCharacter.name);
	}

	private initPersistency(): void {
		this.name.valueChanges
			.pipe(
				distinctUntilChanged(),
				map(PersisterConfigs.defaultNameIfEmpty),
				// Ensure stored name is the same as the displayed one
				tap((name) => this.name.setValue(name, { emitEvent: false })),
				tap((name) => this.characterPersisterService.saveProperty(this.characterUniqueKey, "name", name)),
				takeUntilDestroyed(),
			)
			.subscribe();
	}
}

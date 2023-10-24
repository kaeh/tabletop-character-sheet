import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map, tap } from "rxjs";
import { Character } from "src/app/interfaces/character.interface";
import { CharacterRepository } from "../character-repository/character-repository.service";
import { CharacterDto } from "./character-dto.interface";
import { CharacterMapper } from "./character.mapper";

@Injectable({
    providedIn: 'root'
})
export class CharacterFetcherService {
    private readonly characterRepository = inject(CharacterRepository);
    private readonly httpClient: HttpClient = inject(HttpClient);

    public fetch(): Observable<Character> {
        return this.httpClient.get<CharacterDto>('assets/character.json').pipe(
            map(CharacterMapper.fromDto),
            tap(character => this.characterRepository.initCharacter(character))
        );
    }
}
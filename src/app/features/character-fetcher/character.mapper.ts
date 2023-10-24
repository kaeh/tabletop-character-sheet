import { Character } from "src/app/interfaces/character.interface";
import { CharacterDto } from "./character-dto.interface";
import { SkillMapper } from "./skill.mapper";

export const CharacterMapper = {
    fromDto: (characterDto: CharacterDto): Character => ({
        vitality: {
            current: characterDto.vitality,
            max: NaN
        },
        skills: Object.entries(characterDto.skills).reduce((skills, [skillName, skillDto]) => {
            (skills as any)[skillName] = SkillMapper.fromDto(skillDto);
            return skills;
        }, {} as Character['skills'])
    })
}
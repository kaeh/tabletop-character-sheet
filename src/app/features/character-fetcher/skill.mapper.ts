import { Skill } from "src/app/interfaces/skill.interface";
import { SkillDto } from "./skill-dto.interface";

export const SkillMapper = {
    fromDto: (skillDto: SkillDto): Skill => ({
        base: skillDto.base,
        level: NaN,
        progression: {
            current: skillDto.progression,
            max: NaN
        },
    }),
}
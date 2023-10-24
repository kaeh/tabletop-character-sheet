import { SkillDto } from "./skill-dto.interface";

export interface CharacterDto {
    vitality: number;
    skills: {
        // combat: SkillDto;
        // knowledge: SkillDto;
        // stealth: SkillDto;
        endurance: SkillDto;
        strength: SkillDto;
        // dexterity: SkillDto;
        // magic: SkillDto;
        // movement: SkillDto;
        // perception: SkillDto;
        // social: SkillDto;
        // survival: SkillDto;
        // shooting: SkillDto;
        willpower: SkillDto;
    };
}
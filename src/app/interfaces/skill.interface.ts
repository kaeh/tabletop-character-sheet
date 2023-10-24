import { VariableCharacteristic } from "./variable-characteristic.interface";

export interface Skill {
    base: number;
    level: number;
    progression: VariableCharacteristic;
}
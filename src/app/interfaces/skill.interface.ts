import { VariableCharacteristic } from "./variable-characteristic.interface";

export interface Skill {
    base: number;
    actual: number;
    progression: VariableCharacteristic;
}
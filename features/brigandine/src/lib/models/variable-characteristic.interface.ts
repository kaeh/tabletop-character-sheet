import { signal } from '@angular/core';

export class VariableCharacteristic {
  public readonly current = signal<number>(0);

  private _max = 0;
  public get max(): number {
    return this._max;
  }

  public updateCurrent(value: number): VariableCharacteristic {
    this.current.set(value);
    return this;
  }
}

import { Pipe, PipeTransform } from "@angular/core";
import { PersistedUser } from "@models";

@Pipe({
    name: "appToPersistedUser",
    standalone: true,
})
export class ToPersistedUserPipe implements PipeTransform {
  transform(value: unknown): PersistedUser | null{
    if (!value) {
      return null;
      }
        return value as PersistedUser;
    }
}

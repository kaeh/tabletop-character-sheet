import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "appUserAvatarFallback",
	standalone: true,
})
export class UserAvatarFallbackPipe implements PipeTransform {
	transform(value: string | null | undefined): string {
		return value || "/assets/user-avatar-placeholder.png";
	}
}

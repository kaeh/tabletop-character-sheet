import { inject } from "@angular/core";
import { Auth } from "@angular/fire/auth";

export const injectUserId = (): string => inject(Auth).currentUser?.uid ?? "ERROR_UID_NOT_FOUND";

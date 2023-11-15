import { inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

export const injectUserId: string = inject(ActivatedRoute).snapshot.data["uid"];

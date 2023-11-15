import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "../header";

@Component({
	selector: "app-main-layout",
	standalone: true,
	imports: [CommonModule, RouterOutlet, HeaderComponent],
	template: `
    <app-header />
    <router-outlet></router-outlet>
  `,
})
export class MainLayoutComponent {}

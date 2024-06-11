import { type ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from "@angular/core";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from "@angular/material/snack-bar";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
	providers: [
		// Angular
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideAnimations(),
		// Material
		importProvidersFrom(MatSnackBarModule),
		{ provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 25000 } },
		// Firebase
		provideAuth(() => getAuth()),
		provideFirestore(() => getFirestore()),
		provideFirebaseApp(() =>
			initializeApp({
				projectId: "tabletop-character-sheet-63388",
				appId: "1:492259526847:web:6b46a10332d20761ff9e0a",
				storageBucket: "tabletop-character-sheet-63388.appspot.com",
				apiKey: "AIzaSyApJRQSrZXZDwoINmoTbMZGD0xX2hsGt2g",
				authDomain: "tabletop-character-sheet-63388.firebaseapp.com",
				messagingSenderId: "492259526847",
			}),
		),
	],
};

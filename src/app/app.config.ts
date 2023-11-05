import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		importProvidersFrom(
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
		),
		importProvidersFrom(provideAuth(() => getAuth())),
		importProvidersFrom(provideFirestore(() => getFirestore())),
	],
};

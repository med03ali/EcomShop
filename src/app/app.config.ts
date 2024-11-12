import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideFirebaseApp, initializeApp} from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {ProduitService} from "./produit.service";
import {CategoryService} from "./navbar/category.service";
import {SharedService} from "./shared-service.service";
import {AuthService} from "./auth.service";
import {AuthGuardService} from "./auth-guard.service";
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBIXC9qomxsfnnU4iU5In-qp0qQ1oS8IS8",
  authDomain: "ecomshop-a2a36.firebaseapp.com",
  projectId: "ecomshop-a2a36",
  storageBucket: "ecomshop-a2a36.firebasestorage.app",
  messagingSenderId: "578485536116",
  appId: "1:578485536116:web:1fd2ebee8ad5e0f29ad821",
  measurementId: "G-BYSKSRZYZD"
};


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(),
    provideHttpClient(withFetch()), ProduitService, CategoryService, SharedService, AuthService, AuthGuardService,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(()=>getAuth())


  ]
};

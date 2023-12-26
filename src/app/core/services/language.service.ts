import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  currentLanguage!: string;
  currentLanguageSubject: Subject<any> = new Subject<any>();

  constructor() {}

  setLanguage(lang: string) {
    this.currentLanguage = lang;
  }
}

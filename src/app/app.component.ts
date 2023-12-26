import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from './core/services/user.service';
import { AuthService } from './core/services/auth.service';
import { Subscription } from 'rxjs';
import { LanguageService } from './core/services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ecommerce-frontend';
  private subscription: Subscription = new Subscription();

  constructor(
    private translate: TranslateService,
    private userService: UserService,
    private authService: AuthService,
    private languageService: LanguageService
  ) {
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');
    let lang = sessionStorage.getItem('lang');

    if (lang && this.translate.getLangs().includes(lang)) {
      this.languageService.currentLanguageSubject.next(lang);
      this.languageService.setLanguage(lang);
    }
    else{
      this.languageService.currentLanguageSubject.next(this.translate.getDefaultLang());
      this.languageService.setLanguage(this.translate.getDefaultLang());
    }

  }

  ngOnInit(): void {
    if (this.authService.validateTokenFromCache()) {
      this.subscription.add(
        this.userService.getUserDetails().subscribe((data: any) => {
          this.userService.updateLoggedUser(data);
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

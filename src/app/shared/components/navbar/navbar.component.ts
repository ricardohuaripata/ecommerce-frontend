import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/core/interfaces/category';
import { User } from 'src/app/core/interfaces/user';
import { CategoryService } from 'src/app/core/services/category.service';
import { LanguageService } from 'src/app/core/services/language.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  collections: Category[] = [];
  loggedUser?: User;
  private subscription: Subscription = new Subscription();

  constructor(
    private translate: TranslateService,
    private categoryService: CategoryService,
    private userService: UserService,
    private router: Router,
    private languageService: LanguageService
  ) {}

  switchLanguage(language: string) {
    this.languageService.setLanguage(language);
    this.languageService.currentLanguageSubject.next(language);
    sessionStorage.setItem('lang', language);
  }

  isLanguageActive(language: string): boolean {
    return this.translate.currentLang === language;
  }

  ngOnInit(): void {
    this.translate.use(this.languageService.currentLanguage);
    this.languageService.currentLanguageSubject.subscribe((lang) => {
      this.translate.use(lang);
    });

    this.subscription.add(
      this.userService.loggedUser$.subscribe((user) => {
        this.loggedUser = user;
      })
    );

    this.subscription.add(
      this.categoryService.getCollections().subscribe(
        (data: any) => {
          this.collections = data;
        },
        (error) => {
          this.collections = [];
        }
      )
    );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.userService.updateLoggedUser(undefined); // Actualiza el usuario a 'undefined' o un valor predeterminado
    this.router.navigateByUrl('/');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

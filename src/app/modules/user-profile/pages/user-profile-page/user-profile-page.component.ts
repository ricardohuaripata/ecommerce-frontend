import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/interfaces/user';
import { LanguageService } from 'src/app/core/services/language.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss'],
})
export class UserProfilePageComponent implements OnInit, OnDestroy {
  authUser?: User;
  loading: boolean = true;
  private subscription: Subscription = new Subscription();

  constructor(
    private translate: TranslateService,
    private userService: UserService,
    private router: Router,
    private languageService: LanguageService
  ) {}
  ngOnInit(): void {
    this.translate.use(this.languageService.currentLanguage);
    this.languageService.currentLanguageSubject.subscribe((lang) => {
      this.translate.use(lang);
    });

    this.subscription.add(
      this.userService.loggedUser$.subscribe((user) => {
        this.authUser = user;
        this.loading = false;
      })
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

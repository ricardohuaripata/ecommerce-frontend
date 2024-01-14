import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { LanguageService } from 'src/app/core/services/language.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-verify-email-page',
  templateUrl: './verify-email-page.component.html',
  styleUrls: ['./verify-email-page.component.scss'],
})
export class VerifyEmailPageComponent implements OnInit, OnDestroy {
  verificationSuccess: boolean = false;
  verificationError: boolean = false;
  loading: boolean = true;
  private subscription: Subscription = new Subscription();

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private languageService: LanguageService,
    private userService: UserService,
  ) {}
  ngOnInit(): void {
    this.translate.use(this.languageService.currentLanguage);
    this.languageService.currentLanguageSubject.subscribe((lang) => {
      this.translate.use(lang);
    });

    this.subscription.add(
      this.route.paramMap.subscribe((params) => {
        let token: string = params.get('token')!;

        this.subscription.add(
          this.authService.verifyEmail(token).subscribe({
            next: (response: any) => {
              this.userService.updateLoggedUser(response);

              this.verificationSuccess = true;
              setTimeout(() => {
                this.loading = false;
              }, 1000);
            },
            error: (event) => {
              this.verificationError = true;
              setTimeout(() => {
                this.loading = false;
              }, 1000);
            },
          })
        );
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

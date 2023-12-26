import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/interfaces/user';
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
    private router: Router
  ) {
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');
    this.translate.use(
      sessionStorage.getItem('lang') || this.translate.getDefaultLang()
    );
  }
  ngOnInit(): void {
    this.subscription.add(
      this.userService.getUserDetails().subscribe((data: any) => {
        this.authUser = data;
        this.loading = false;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.router.navigateByUrl('/').then(() => {
      location.reload();
    });
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

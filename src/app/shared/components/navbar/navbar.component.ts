import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/core/interfaces/category';
import { User } from 'src/app/core/interfaces/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { CategoryService } from 'src/app/core/services/category.service';
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
    private authService: AuthService,
    private router: Router
  ) {}

  switchLanguage(language: string) {
    sessionStorage.setItem('lang', language);
    location.reload();
  }
  isLanguageActive(language: string): boolean {
    return this.translate.currentLang === language;
  }

  ngOnInit(): void {
    if (this.authService.validateTokenFromCache()) {
      this.subscription.add(
        this.userService.getUserDetails().subscribe((data: any) => {
          this.loggedUser = data;
          console.log('Usuario autenticado: ' + data.email);
        })
      );
    }

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
    this.loggedUser = undefined;
    this.router.navigateByUrl('/'); // Navega a la ruta definida ('/pagina' en este caso)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

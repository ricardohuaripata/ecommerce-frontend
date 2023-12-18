import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/core/interfaces/category';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  collections: Category[] = [];
  private subscription: Subscription = new Subscription();

  constructor(
    private translate: TranslateService,
    private categoryService: CategoryService
  ) {}

  switchLanguage(language: string) {
    sessionStorage.setItem('lang', language);
    location.reload();
  }
  isLanguageActive(language: string): boolean {
    return this.translate.currentLang === language;
  }

  ngOnInit(): void {
    this.subscription.add(
      this.categoryService.getCollections().subscribe(
        (data: any) => {
          this.collections = data;
          console.log(this.collections);
        },
        (error) => {
          this.collections = [];
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

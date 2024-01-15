import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/core/services/language.service';
@Component({
  selector: 'app-care-recommendations-page',
  templateUrl: './care-recommendations-page.component.html',
  styleUrls: ['./care-recommendations-page.component.scss'],
})
export class CareRecommendationsPageComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    private languageService: LanguageService
  ) {}
  ngOnInit(): void {
    this.translate.use(this.languageService.currentLanguage);
    this.languageService.currentLanguageSubject.subscribe((lang) => {
      this.translate.use(lang);
    });
  }
}

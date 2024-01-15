import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-size-chart-page',
  templateUrl: './size-chart-page.component.html',
  styleUrls: ['./size-chart-page.component.scss'],
})
export class SizeChartPageComponent implements OnInit {
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

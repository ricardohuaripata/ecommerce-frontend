import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// multilenguaje
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.module';
import { HttpClient } from '@angular/common/http';

import { HomeRoutingModule } from './home-routing.module';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

import { SharedModule } from "../../shared/shared.module";
import { CategoryItemComponent } from './components/category-item/category-item.component';
import { SizeChartPageComponent } from './pages/size-chart-page/size-chart-page.component';
import { CareRecommendationsPageComponent } from './pages/care-recommendations-page/care-recommendations-page.component';

@NgModule({
  declarations: [
    NotFoundPageComponent,
    HomePageComponent,
    CategoryItemComponent,
    SizeChartPageComponent,
    CareRecommendationsPageComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
      },
  }),
  ]
})
export class HomeModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SizeChartPageComponent } from './pages/size-chart-page/size-chart-page.component';
import { CareRecommendationsPageComponent } from './pages/care-recommendations-page/care-recommendations-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title: "Home - Og's",
  },
  {
    path: 'sizes',
    component: SizeChartPageComponent,
    title: "Sizes - Og's",
  },
  {
    path: 'care-recommendations',
    component: CareRecommendationsPageComponent,
    title: "Care Recommendations - Og's",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}

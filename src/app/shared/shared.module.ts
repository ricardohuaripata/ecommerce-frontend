import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SizeListSortPipe } from './pipes/size-list-sort.pipe';

// multilenguaje
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    SizeListSortPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SizeListSortPipe
  ]
})
export class SharedModule { }

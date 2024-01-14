import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductPageComponent } from './pages/product-page/product-page.component';

// multilenguaje
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { HttpLoaderFactory } from '../../app.module';
import { HttpClient } from '@angular/common/http';

import { ToastModule } from 'primeng/toast';
import { SharedModule } from "../../shared/shared.module";
import { GalleriaModule } from 'primeng/galleria';

@NgModule({
    declarations: [
        ProductPageComponent
    ],
    imports: [
        CommonModule,
        ProductsRoutingModule,
        ToastModule,
        SharedModule,
        GalleriaModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
    ]
})
export class ProductsModule { }

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/core/interfaces/order';
import { LanguageService } from 'src/app/core/services/language.service';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-order-details-page',
  templateUrl: './order-details-page.component.html',
  styleUrls: ['./order-details-page.component.scss'],
})
export class OrderDetailsPageComponent implements OnInit, OnDestroy {
  loading: boolean = true;
  order?: Order;
  private subscription: Subscription = new Subscription();

  constructor(
    private translate: TranslateService,
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.translate.use(this.languageService.currentLanguage);
    this.languageService.currentLanguageSubject.subscribe((lang) => {
      this.translate.use(lang);
    });

    this.subscription.add(
      this.route.paramMap.subscribe((params) => {
        let orderIdParam = params.get('orderId');

        this.subscription.add(
          this.orderService.getOrderById(orderIdParam!).subscribe(
            (data: any) => {
              this.order = data;
              this.loading = false;
            },
            (error) => {
              this.router.navigate(['/']);
            }
          )
        );
      })
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

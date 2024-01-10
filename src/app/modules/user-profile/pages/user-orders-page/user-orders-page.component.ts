import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/core/interfaces/order';
import { LanguageService } from 'src/app/core/services/language.service';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-user-orders-page',
  templateUrl: './user-orders-page.component.html',
  styleUrls: ['./user-orders-page.component.scss'],
})
export class UserOrdersPageComponent implements OnInit, OnDestroy {
  loading: boolean = true;
  orderList: Order[] = [];
  private subscription: Subscription = new Subscription();

  constructor(
    private translate: TranslateService,
    private orderService: OrderService,
    private router: Router,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.translate.use(this.languageService.currentLanguage);
    this.languageService.currentLanguageSubject.subscribe((lang) => {
      this.translate.use(lang);
    });

    this.subscription.add(
      this.orderService.getUserOrders().subscribe((data: any) => {
        this.orderList = data;
        this.loading = false;
        console.log(this.orderList);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

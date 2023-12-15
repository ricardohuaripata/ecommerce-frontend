import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/core/interfaces/category';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  collections: Category[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private categoryService: CategoryService) {}

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

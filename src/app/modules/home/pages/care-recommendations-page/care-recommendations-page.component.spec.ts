import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareRecommendationsPageComponent } from './care-recommendations-page.component';

describe('CareRecommendationsPageComponent', () => {
  let component: CareRecommendationsPageComponent;
  let fixture: ComponentFixture<CareRecommendationsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareRecommendationsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareRecommendationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

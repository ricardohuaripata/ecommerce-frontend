import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeChartPageComponent } from './size-chart-page.component';

describe('SizeChartPageComponent', () => {
  let component: SizeChartPageComponent;
  let fixture: ComponentFixture<SizeChartPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SizeChartPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SizeChartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

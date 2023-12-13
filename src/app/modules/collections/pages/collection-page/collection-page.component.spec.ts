import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionPageComponent } from './collection-page.component';

describe('CollectionPageComponent', () => {
  let component: CollectionPageComponent;
  let fixture: ComponentFixture<CollectionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

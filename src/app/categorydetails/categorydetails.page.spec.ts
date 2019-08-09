import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorydetailsPage } from './categorydetails.page';

describe('CategorydetailsPage', () => {
  let component: CategorydetailsPage;
  let fixture: ComponentFixture<CategorydetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorydetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorydetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

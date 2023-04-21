import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeGerentePage } from './home-gerente.page';

describe('HomeGerentePage', () => {
  let component: HomeGerentePage;
  let fixture: ComponentFixture<HomeGerentePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HomeGerentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

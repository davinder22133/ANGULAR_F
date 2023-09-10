import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBoardViewComponent } from './dash-board-view.component';

describe('DashBoardViewComponent', () => {
  let component: DashBoardViewComponent;
  let fixture: ComponentFixture<DashBoardViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashBoardViewComponent]
    });
    fixture = TestBed.createComponent(DashBoardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizzaTalkComponent } from './visualizza-talk.component';

describe('VisualizzaTalkComponent', () => {
  let component: VisualizzaTalkComponent;
  let fixture: ComponentFixture<VisualizzaTalkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisualizzaTalkComponent]
    });
    fixture = TestBed.createComponent(VisualizzaTalkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

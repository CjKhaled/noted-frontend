import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGroupDialogComponent } from './update-group-dialog.component';

describe('UpdateGroupDialogComponent', () => {
  let component: UpdateGroupDialogComponent;
  let fixture: ComponentFixture<UpdateGroupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateGroupDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

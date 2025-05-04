import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTaskToUserComponent } from './assign-task-to-user.component';

describe('AssignTaskToUserComponent', () => {
  let component: AssignTaskToUserComponent;
  let fixture: ComponentFixture<AssignTaskToUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignTaskToUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignTaskToUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

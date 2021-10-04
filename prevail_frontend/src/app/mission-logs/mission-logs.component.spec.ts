import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionLogsComponent } from './mission-logs.component';

describe('MissionLogsComponent', () => {
  let component: MissionLogsComponent;
  let fixture: ComponentFixture<MissionLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissionLogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ArchivosComponent } from './archivos.component';

describe('ArchivosComponent', () => {
  let component: ArchivosComponent;
  let fixture: ComponentFixture<ArchivosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

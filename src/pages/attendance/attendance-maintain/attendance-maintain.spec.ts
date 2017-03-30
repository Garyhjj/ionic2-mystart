import { async,ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { App, Config, Form, IonicModule, Keyboard, DomController, MenuController, NavController, Platform, NavParams, GestureController } from 'ionic-angular';
import { AttendanceMaintainPage } from './attendance-maintain';
import { ConfigMock, PlatformMock, NavMock } from '../../../mocks';


describe('AttendanceMaintainPage (inline template)', () => {

  let comp: AttendanceMaintainPage;
  let fixture: ComponentFixture<AttendanceMaintainPage>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AttendanceMaintainPage], // declare the test component
      providers: [
        App, DomController, Form, Keyboard, NavController,GestureController,
        {provide: Config, useClass: ConfigMock},
        {provide: Platform, useClass: PlatformMock},
        {provide: NavParams, useClass: NavMock}
      ],
      imports: [
        IonicModule,
      ],
    })
     .compileComponents();

    fixture = TestBed.createComponent(AttendanceMaintainPage);

    comp = fixture.componentInstance; // BannerComponent test instance

    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('ion-list'));
    el = de.nativeElement;
  }));

  it('should display original title', () => {
    fixture.detectChanges();
    expect(el.textContent).toContain(comp.availableHoliday.day);
  });

  it('should display a different test title', () => {
    comp.availableHoliday.day = 23;
    fixture.detectChanges();
    expect(el.textContent).toContain(23);
  });
});

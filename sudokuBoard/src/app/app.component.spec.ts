import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppService } from './app.service';

describe('AppComponent', () => {
  let appComponent: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let appService: AppService;
  let debugEntity: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [
        AppComponent
      ],
      providers: [AppService]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;
    appService = TestBed.get(AppService);
    debugEntity = fixture.debugElement;
  }));

  // Check if component is created or not
  it('Valid Component', () => {
    expect(debugEntity.componentInstance).toBeTruthy();
  });

  // Spinner should load on start up screen
  it('Spinner should load on Start up', () => {
    const spinner = debugEntity.nativeElement.querySelector('.spinner');
    fixture.detectChanges();
    expect(spinner).toBeTruthy();
  });

  // Upon page load the board must not contain any values
  it(`sudokuBoard should be Empty at StartUp`, () => {
    const app = debugEntity.componentInstance;
    expect(app.values).toBeUndefined();
  });

  // checking marquee text
  it('Marquee scrolling text', () => {
    const marqueeText = debugEntity.nativeElement.querySelector('marquee').textContent;
    expect(marqueeText).toContain('This Sudoku Application is constructed with Angular and Nginx');
  });

  //clicking on reload button shouldn't disable it
  it('Reload Button behavior', () => {
    const reloadButton = debugEntity.nativeElement.querySelector('#reloadBtn');
    const alertBox = debugEntity.nativeElement.querySelector('.alert-link');

    reloadButton.click();
    fixture.detectChanges();

    expect(alertBox).toBeNull();
    expect(reloadButton.disabled).toBeFalsy();
  });

});
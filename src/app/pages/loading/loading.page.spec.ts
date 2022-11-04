import { ɵresetCompiledComponents } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { LoadingPage } from './loading.page';

describe('LoadingPage', () => {
  let component: LoadingPage;
  let fixture: ComponentFixture<LoadingPage>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingPage ],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingPage);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  //right now, it doesn't go to home, because I can't find that goddamn path for the tabs section
  it('should go to login page after load', () => {
    spyOn(router, 'navigate');

    component.ngOnInit();
    
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });
});

import { Component, OnInit } from '@angular/core';
import { AppState } from '@capacitor/app';
import { StoredCallback } from '@capacitor/core/types/definitions-internal';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Window } from 'selenium-webdriver';
import { LoadingState } from 'src/app/store/loading/LoadingState';


@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {

  loadingState$: Observable<LoadingState>;

  constructor(private store: Store<{loading: LoadingState}>) { //<AppState>
    //this.loadingState$ = this.store.select(0);
   }

  ngOnInit() {
    this.loadingState$ = this.store.select('loading');
  }

}

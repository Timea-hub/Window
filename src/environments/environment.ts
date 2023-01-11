// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import * as firebase from "firebase/compat";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const environment = {
  firebaseConfig: {
    apiKey: "AIzaSyAhrOUzeeKyRpU01vZBCxifJYqqN5Zf6no",
    authDomain: "winsowsapp.firebaseapp.com",
    projectId: "winsowsapp",
    storageBucket: "winsowsapp.appspot.com",
    messagingSenderId: "953586470552",
    appId: "1:953586470552:web:23a1ed73d0875575f84aed",
    measurementId: "G-99K8PKV0JV"
  },
  production: false

  // const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
};



function getConfig() {
  return this.firebaseConfig;
}
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

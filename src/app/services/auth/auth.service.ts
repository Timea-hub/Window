import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
//import { ETIME } from 'constants';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user/user';
//import * as firebase from 'firebase/compat/app';
import * as firebase from 'firebase/compat/app'
import { UserRegister } from 'src/app/model/user/UserRegister';
//import { FirebaseDefaults } from '@firebase/util';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) {
    //this.register = fireStore.collection<any>('User');
   }

  register(userRegister: UserRegister) : Observable<void> {
    // return new Observable<void>(observer => {
    //   setTimeout(() => {
    //     if(userRegister.email == "error@email.com"){
    //       observer.error({message: "email already registered"})
    //     } else {
    //       observer.next();
    //     }
    //     observer.complete();
        
    //   }, 3000)
    // })
//------------------------------
    return new Observable<void>(observer => {

    this.auth.createUserWithEmailAndPassword(userRegister.email, userRegister.password)
    .then((  ) => {
        observer.next();
        observer.complete();
      }).catch(error => {
        observer.error(error);
        observer.complete();
      })
      })

  }




  recoverEmailPassword(email: string) : Observable<void> {
    return new Observable<void>(observer => {
        this.auth.sendPasswordResetEmail(email).then(() => {
          observer.next();
          observer.complete();
        }).catch(error => {
          observer.error(error);
          observer.complete();
        })
    })
  }

  login(email: string, password: string) : Observable<User>{
    return new Observable<User>(observer => {
      this.auth.setPersistence(firebase.default.auth.Auth.Persistence.LOCAL).then(() => {
        this.auth.signInWithEmailAndPassword(email, password)
        .then((firebaseUser: firebase.default.auth.UserCredential) => {
        observer.next({email, id: firebaseUser.user.uid});
        observer.complete();
      }).catch(error => {
        observer.error(error);
        observer.complete();
      })
      })
    })
  }
}

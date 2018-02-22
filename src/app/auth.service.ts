import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Membre} from './services/membre.model';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import { JwtHelperService } from '@auth0/angular-jwt';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
export interface User {
  uid: string;
  email?: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
  membre?: object;
}
@Injectable()

export class AuthService {
  private conjouintDoc: AngularFirestoreDocument<User>;
  private membreDoc: AngularFirestoreDocument<User>;
  private ismembreDoc: AngularFirestoreDocument<User>;
  private membresCollection: AngularFirestoreCollection<User>;
  membres: Observable<User[]>;
  redirectUrl: string;
  isLoggedIn = false;
  membre: Observable<User>;
  conjouint: Observable<User>;
  userToken: User;
  user: Observable<User>;
  isConnected= false;
  authState: any = null;
  memberIsInDataBase = false;
  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {
    //// Get auth data, then get firestore user document || null
    this.user = this.afAuth.authState
      .switchMap(user => {
        this.authState = user;
        if (user) {
          this.isLoggedIn = true;
          this.membreDoc = afs.doc<User>(`users/${this.currentUserEmail}`);
          this.userToken = {email: user.email, uid: user.uid, photoURL: user.photoURL, displayName: user.displayName};
          this.membre = this.membreDoc.valueChanges();
          this.isInDatabase(user.email);
          return this.afs.doc<User>(`users/${user.email}`).valueChanges();
        } else {
          this.isLoggedIn = false;
          this.isConnected = false;
          return Observable.of(null);
        }
      });
      this.user.subscribe( x => {
        console.log('_x_--' , x, this.currentUserEmail);
      });
    this.membresCollection = afs.collection<User>('users');
    this.membres = this.membresCollection.valueChanges();
  }
  getConjouintInfo (path: string): Observable<User> | null {
    let conjInf: Observable<User>;
    this.conjouintDoc = this.afs.doc<User>(`users/${path}`);
    this.conjouint = this.conjouintDoc.valueChanges();
    conjInf = this.conjouint;
    return conjInf;
  }
  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }
  FacebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }
  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }
  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
     //   this.updateUserData(credential.user);
      });
  }
  get authenticated(): boolean {
    return this.authState !== null;
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.email}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    return userRef.set(data);
  }
  updateMembre( membre: Membre) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.userToken.email}`);
    const data: User = {
      uid: this.userToken.uid,
      email: this.userToken.email,
      displayName: this.userToken.displayName,
      photoURL: this.userToken.photoURL,
      membre: membre
    };
    return userRef.update(data);
  }

  addUserConjouint( memb: Membre) {

    console.log('conjountMembre', memb);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${memb['email']}`);
    const data: User = {
      uid: '',
      email: memb.email,
      displayName: '',
      photoURL: '',
      membre : {
        adhDate: memb.adhDate ? memb.adhDate : '',
        infFacturation : memb.infFacturation,
        estMembreActif: true,
        email: memb.email,
        nom: memb.nom,
        prenom: memb.prenom,
        adresse: memb.adresse,  // Référence à une autre interface
        ville: memb.ville,
        codePostal: memb.codePostal,
        telephone: memb.telephone,
        profession: memb.profession,
        dateNaissance: memb.dateNaissance,
        typeCotisation: memb.typeCotisation,
        courrielConjouint: memb.courrielConjouint,
        teleList: memb.teleList,
        nomListe: memb.nomListe,
        animExc: memb.animExc,
        recenNoel: memb.recenNoel,
        animKio: memb.animKio,
        consAdm: memb.consAdm,
        redacRevi: memb.redacRevi,
        promoPubli: memb.promoPubli,
        autre: memb.autre
      }
    };
    return userRef.set(data);
  }
  isInDatabase(email: string): boolean {
    console.log('emailData', email);
    let _isInDataBase: boolean;
    _isInDataBase = false;
    let count: number;
    count = 0;
    this.afs.collection('users', ref =>
      ref.where('email', '==', email))
      .valueChanges().subscribe( x => {
        count++;
        const temp = x[0];
      if (x.length === 1) {
        console.log('--x__', x);
        this.userToken['membre'] = temp['membre'];
        console.log('emailData2', this.userToken['membre']);
        this.memberIsInDataBase = true;
        _isInDataBase = true;
      }
    });
console.log('_isInDataBase' , _isInDataBase);
    return _isInDataBase;
  }

  addUserMembre( memb: Membre) {
    console.log('add', this.userToken['email'], memb );
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.userToken['email']}`);
    const data: User = {
      uid: this.userToken['uid'],
      email: this.userToken['email'],
      displayName: this.userToken['displayName'],
      photoURL: this.userToken['photoURL'],
      membre : {
        adhDate: memb.adhDate ? memb.adhDate : '',
        infFacturation : memb.infFacturation,
        estMembreActif: true,
        email: memb.email,
        nom: memb.nom,
        prenom: memb.prenom,
        adresse: memb.adresse,  // Référence à une autre interface
        ville: memb.ville,
        codePostal: memb.codePostal,
        telephone: memb.telephone,
        profession: memb.profession,
        dateNaissance: memb.dateNaissance,
        typeCotisation: memb.typeCotisation,
        courrielConjouint: memb.courrielConjouint,
        teleList: memb.teleList,
        nomListe: memb.nomListe,
        animExc: memb.animExc,
        recenNoel: memb.recenNoel,
        animKio: memb.animKio,
        consAdm: memb.consAdm,
        redacRevi: memb.redacRevi,
        promoPubli: memb.promoPubli,
        autre: memb.autre
      }
    };
    return userRef.set(data);
  }
  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
  get currentUserEmail(): string {
    return this.authenticated ? this.authState.email : '';
  }
  login(): Observable<boolean> {
    return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}


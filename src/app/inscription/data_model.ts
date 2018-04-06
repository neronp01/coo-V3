import { AuthService } from '../auth.service';
export class InfoMembre {
  adhDateCtrl = 0;
  infFacturationCtrl = [];
  estMembreActifCtrl = false;
  emailCtrl = '';
  dateNaissanceCtrl = '';
  typeCotisationCtrl = '';
  prenomCtrl = '';
  nomCtrl = '';
  adresseCtrl = '';
  villeCtrl = '';
  codePostalCtrl = '';
  professionCtrl = '';
  telephoneCtrl = '';
  courrielConjouintCtrl = '';
  constructor(private auth: AuthService) {
    this.emailCtrl = this.auth.userToken['email'] ? this.auth.userToken['email'] : '';
    this.adhDateCtrl = this.auth.userToken['membre']['adhDate'] ? this.auth.userToken['membre']['adhDate'] : 0;
}
}
export class InfoConjouint {
  c_emailCtrl = InfoMembre['courrielConjouintCtrl'];
  c_prenomCtrl = '';
  c_nomCtrl = '';
  c_professionCtrl = '';
  c_telephoneCtrl = '';
}

export class InfoComp {
  teleListCtrl = true;
  nomListeCtrl = true;
  animExcCtrl = false;
  recenNoelCtrl = false;
  animKioCtrl = false;
  consAdmCtrl = false;
  redacReviCtrl = false;
  promoPubliCtrl = false;
  autreCtrl = false;
}

export class Items {
  don = 0;
  fraisO = 0;
  fraisAdh = 0;
}

export class Inscription {
  membre = InfoMembre;
  conjouint = InfoConjouint;
  complement = InfoComp;
  items = Items;
}

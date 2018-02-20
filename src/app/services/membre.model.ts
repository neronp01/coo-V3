
export class Membre {
  infFacturation?: Array<any>;
  estMembreActif?: boolean;
  email?: string;
  nom?: string;
  prenom?: string;
  adresse?: string;  // Référence à une autre interface
  ville?: string;
  codePostal?: string;
  telephone?: string;
  profession?: string;
  dateNaissance?: string;
  typeCotisation?: string;
  courrielConjouint?: string;
  teleList?: boolean;
  nomListe?: boolean;
  animExc?: boolean;
  recenNoel?: boolean;
  animKio?: boolean;
  consAdm?: boolean;
  redacRevi?: boolean;
  promoPubli?: boolean;
  paiement?: Array<object>;
  autre?: string;
  adhDate?: Date;
  constructor() {
  }
}

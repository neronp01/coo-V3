import { Injectable } from '@angular/core';

@Injectable()
export class EmailService {
email: string;
  constructor() { }
    setEmail(e: string) {
    this.email = e;
    console.log('email' ,  this.email);
}
}

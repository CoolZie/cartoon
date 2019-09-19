import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CountryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CountryProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CountryProvider Provider');
  }
  country(){
    return this.http.get('../../assets/json/country.json')
  }
  current(){
    return this.http.get('http://www.ip-api.com/json')
  }
  
}

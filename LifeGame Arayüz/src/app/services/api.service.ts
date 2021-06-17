import { Kayit } from './../models/kayit';
import { Epin } from './../models/Epin';
import { Kullanici } from './../models/Kullanici';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = "http://localhost:14309/api/";
  siteUrl = "http://localhost:14309/";
  constructor(
    public http: HttpClient
  ) { }

  KullaniciListe() {
    return this.http.get(this.apiUrl + "kullanicilarliste");
  }
  KullaniciById(kullaniciId: string) {
    return this.http.get(this.apiUrl + "kullanicilarbyid/" + kullaniciId);
  }
  KullaniciEkle(kullanici: Kullanici) {
    return this.http.post(this.apiUrl + "kullanicilarekle", kullanici);
  }
  KullaniciDuzenle(kullanici: Kullanici) {
    return this.http.put(this.apiUrl + "kullanicilarduzenle", kullanici);
  }
  KullaniciSil(kullaniciId: string) {
    return this.http.delete(this.apiUrl + "kullanicilarsil/" + kullaniciId);
  }
  EpinListe() {
    return this.http.get(this.apiUrl + "epinliste");
  }
  EpinById(epinId: string) {
    return this.http.get(this.apiUrl + "epinbyid/" + epinId);
  }
  EpinEkle(epin: Epin) {
    return this.http.post(this.apiUrl + "epinekle", epin);
  }
  EpinDuzenle(epin: Epin) {
    return this.http.put(this.apiUrl + "epinduzenle", epin);
  }
  EpinSil(epinId: string) {
    return this.http.delete(this.apiUrl + "epinsil/" + epinId);
  }

  KullaniciEpinListe(kullaniciId: string) {
    return this.http.get(this.apiUrl + "kullanicilarepinliste/" + kullaniciId);
  }
  EpinKullaniciListe(epinId: string) {
    return this.http.get(this.apiUrl + "epinkullanicilarliste/" + epinId);
  }
  KayitEkle(kayit: Kayit) {
    return this.http.post(this.apiUrl + "kayitekle", kayit);
  }
  KayitSil(kayitId: string) {
    return this.http.delete(this.apiUrl + "kayitsil/" + kayitId);
  }
}

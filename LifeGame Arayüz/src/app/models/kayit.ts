import { Epin } from './Epin';
import { Kullanici } from 'src/app/models/Kullanici';
export class Kayit {
    kayitId: string;
    kayitEpinId: string;
    kayitKullaniciId: string;
    kullaniciBilgi: Kullanici;
    epinBilgi: Epin;
}
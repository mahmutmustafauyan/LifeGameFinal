import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../../services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Kullanici } from 'src/app/models/Kullanici';

@Component({
  selector: 'app-kullanicilar-dialog',
  templateUrl: './kullanicilar-dialog.component.html',
  styleUrls: ['./kullanicilar-dialog.component.css']
})
export class KullaniciDialogComponent implements OnInit {
  dialogBaslik: string;
  islem: string;
  frm: FormGroup;
  yeniKayit: Kullanici;
  constructor(
    public matDialog: MatDialog,
    public frmBuild: FormBuilder,
    public dialogRef: MatDialogRef<KullaniciDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
    this.islem = data.islem;
    this.yeniKayit = data.kayit;
    if (this.islem == 'ekle') {
      this.dialogBaslik = "Kullanici Ekle";
    }
    if (this.islem == 'duzenle') {
      this.dialogBaslik = "Kullanici Düzenle";
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {

  }
  FormOlustur() {
    return this.frmBuild.group({
      kullaniciNo: [this.yeniKayit.kullaniciNo],
      kullaniciAdsoyad: [this.yeniKayit.kullaniciAdsoyad],
      kullaniciDogTarih: [this.yeniKayit.kullaniciDogTarih],
    });
  }
}

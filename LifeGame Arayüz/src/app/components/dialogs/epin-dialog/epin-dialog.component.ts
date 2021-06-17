import { Epin } from './../../../models/Epin';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-epin-dialog',
  templateUrl: './epin-dialog.component.html',
  styleUrls: ['./epin-dialog.component.css']
})
export class EpinDialogComponent implements OnInit {
  dialogBaslik: string;
  islem: string;
  frm: FormGroup;
  yeniKayit: Epin;
  constructor(
    public matDialog: MatDialog,
    public frmBuild: FormBuilder,
    public dialogRef: MatDialogRef<EpinDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
    this.islem = data.islem;
    this.yeniKayit = data.kayit;
    if (this.islem == 'ekle') {
      this.dialogBaslik = "Epin Ekle";
    }
    if (this.islem == 'duzenle') {
      this.dialogBaslik = "Epin Düzenle";
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {

  }
  FormOlustur() {
    return this.frmBuild.group({
      epinKodu: [this.yeniKayit.epinKodu],
      epinAdi: [this.yeniKayit.epinAdi],
      epinFiyat: [this.yeniKayit.epinFiyat],
    });
  }

}

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sonuc } from '../../models/Sonuc';
import { Epin } from '../../models/Epin';
import { Kullanici } from 'src/app/models/Kullanici';
import { Kayit } from '../../models/kayit';
import { MyAlertService } from '../../services/myAlert.service';
import { ApiService } from '../../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-epinlistele',
  templateUrl: './epinlistele.component.html',
  styleUrls: ['./epinlistele.component.css']
})
export class EpinlisteleComponent implements OnInit {
  kayitlar: Kayit[];
  epinler: Epin[];
  secKullanici: Kullanici;
  kullaniciId: string;
  epinId: string = "";
  displayedColumns = ['epinKodu', 'epinAdi', 'epinFiyat', 'islemler'];
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public alert: MyAlertService,
    public route: ActivatedRoute,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p) {
        this.kullaniciId = p.kullaniciId;
        this.KullaniciGetir();
        this.KayitListele();
        this.EpinListele();
      }
    });
  }

  KullaniciGetir() {
    this.apiServis.KullaniciById(this.kullaniciId).subscribe((d: Kullanici) => {
      this.secKullanici = d;
    });
  }
  KayitListele() {
    this.apiServis.KullaniciEpinListe(this.kullaniciId).subscribe((d: Kayit[]) => {
      this.kayitlar = d;
      this.dataSource = new MatTableDataSource(this.kayitlar);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  EpinListele() {
    this.apiServis.EpinListe().subscribe((d: Epin[]) => {
      this.epinler = d;
    });
  }
  EpinSec(epinId: string) {
    this.epinId = epinId;
  }
  Kaydet() {
    if (this.epinId == "") {
      var s: Sonuc = new Sonuc();
      s.islem = false;
      s.mesaj = "Epin Seçiniz";
      this.alert.AlertUygula(s);

      return false;
    }

    var kayit: Kayit = new Kayit();
    kayit.kayitEpinId = this.epinId;
    kayit.kayitKullaniciId = this.kullaniciId;

    this.apiServis.KayitEkle(kayit).subscribe((s: Sonuc) => {
      this.alert.AlertUygula(s);
      if (s.islem) {
        this.KayitListele();
      }
    });

  }

  Sil(kayit: Kayit) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '400px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.epinBilgi.epinAdi + " Epini Silinecektir Onaylıyor musunuz?";
    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KayitSil(kayit.kayitId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitListele();
          }
        });

      }
    });
  }
}

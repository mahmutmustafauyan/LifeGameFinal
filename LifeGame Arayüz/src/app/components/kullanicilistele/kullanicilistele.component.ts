import { MyAlertService } from '../../services/myAlert.service';
import { Sonuc } from '../../models/Sonuc';
import { Kayit } from '../../models/kayit';
import { Epin } from './../../models/Epin';
import { ApiService } from '../../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Kullanici } from 'src/app/models/Kullanici';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { KullanicisecDialogComponent } from '../dialogs/kullanicisec-dialog/kullanicisec-dialog.component';

@Component({
  selector: 'app-kullanicilistele',
  templateUrl: './kullanicilistele.component.html',
  styleUrls: ['./kullanicilistele.component.css']
})
export class KullanicilisteleComponent implements OnInit {
  epinId: string;
  secEpin: Epin;
  kayitlar: Kayit[];
  displayedColumns = ['kullaniciNo', 'kullaniciAdsoyad', 'kullaniciDogTarih', 'kullaniciEpinSayisi', 'islemler'];
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  dialogRef: MatDialogRef<KullanicisecDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.epinId = p.epinId;
      this.EpinById();
      this.KayitListele();
    });
  }
  KayitListele() {
    this.apiServis.EpinKullaniciListe(this.epinId).subscribe((d: Kayit[]) => {
      this.kayitlar = d;
      this.dataSource = new MatTableDataSource(this.kayitlar);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  EpinById() {
    this.apiServis.EpinById(this.epinId).subscribe((d: Epin) => {
      this.secEpin = d;
    });
  }

  Ekle() {
    this.dialogRef = this.matDialog.open(KullanicisecDialogComponent, {
      width: '800px'
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        var kayit: Kayit = new Kayit();
        kayit.kayitKullaniciId = d.kullaniciId;
        kayit.kayitEpinId = this.epinId;

        this.apiServis.KayitEkle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitListele();
          }
        });
      }
    });
  }

  Sil(kayit: Kayit) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '500px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.kullaniciBilgi.kullaniciAdsoyad + " isimli kullanicilar epinten çıkarılacaktır Onaylıyor musunuz?";
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

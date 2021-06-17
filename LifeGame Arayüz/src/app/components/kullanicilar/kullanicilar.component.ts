import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MyAlertService } from '../../services/myAlert.service';
import { Sonuc } from '../../models/Sonuc';
import { KullaniciDialogComponent } from '../dialogs/kullanicilar-dialog/kullanicilar-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Kullanici } from 'src/app/models/Kullanici';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-kullanicilar',
  templateUrl: './kullanicilar.component.html',
  styleUrls: ['./kullanicilar.component.scss']
})
export class KullaniciComponent implements OnInit {
  kullanicilarlar: Kullanici[];
  displayedColumns = ['kullaniciNo', 'kullaniciAdsoyad', 'kullaniciDogTarih', 'kullaniciEpinSayisi', 'islemler'];
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef: MatDialogRef<KullaniciDialogComponent>;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) { }

  ngOnInit() {
    this.KullaniciListele();
  }
  KullaniciListele() {
    this.apiServis.KullaniciListe().subscribe((d: Kullanici[]) => {
      this.kullanicilarlar = d;
      this.dataSource = new MatTableDataSource(this.kullanicilarlar);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  Filtrele(e) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();

    }
  }

  Ekle() {
    var yeniKayit: Kullanici = new Kullanici();
    this.dialogRef = this.matDialog.open(KullaniciDialogComponent, {
      width: '400px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KullaniciEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KullaniciListele();
          }
        });
      }
    });

  }

  Duzenle(kayit: Kullanici) {
    this.dialogRef = this.matDialog.open(KullaniciDialogComponent, {
      width: '400px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        kayit.kullaniciNo = d.kullaniciNo;
        kayit.kullaniciAdsoyad = d.kullaniciAdsoyad;
        kayit.kullaniciDogTarih = d.kullaniciDogTarih;

        this.apiServis.KullaniciDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
        });
      }
    });
  }

  Sil(kayit: Kullanici) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '500px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.kullaniciAdsoyad + " isimli kullanicilar silinecektir Onaylıyor musunuz?"

    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KullaniciSil(kayit.kullaniciId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KullaniciListele();
          }
        });
      }
    });
  }
}

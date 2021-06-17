import { Sonuc } from '../../models/Sonuc';
import { EpinDialogComponent } from '../dialogs/epin-dialog/epin-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MyAlertService } from '../../services/myAlert.service';
import { ApiService } from '../../services/api.service';
import { Epin } from '../../models/Epin';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-epin',
  templateUrl: './epin.component.html',
  styleUrls: ['./epin.component.scss']
})
export class EpinComponent implements OnInit {
  epinler: Epin[];
  dataSource: any;
  displayedColumns = ['epinKodu', 'epinAdi', 'epinFiyat', 'epinKullaniciSayisi', 'detay'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef: MatDialogRef<EpinDialogComponent>;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public alert: MyAlertService,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.EpinListele();
  }
  EpinListele() {
    this.apiServis.EpinListe().subscribe((d: Epin[]) => {
      this.epinler = d;
      this.dataSource = new MatTableDataSource(d);
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
    var yeniKayit: Epin = new Epin();
    this.dialogRef = this.matDialog.open(EpinDialogComponent, {
      width: '400px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.EpinEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.EpinListele();
          }
        });


      }
    });
  }
  Duzenle(kayit: Epin) {
    this.dialogRef = this.matDialog.open(EpinDialogComponent, {
      width: '400px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });

    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        d.epinId = kayit.epinId;
        this.apiServis.EpinDuzenle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.EpinListele();
          }
        });
      }
    });
  }
  Sil(kayit: Epin) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '500px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.epinAdi + " isimli epin silinecektir Onaylıyor musunuz?"
    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.EpinSil(kayit.epinId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.EpinListele();
          }
        });
      }
    });
  }
}

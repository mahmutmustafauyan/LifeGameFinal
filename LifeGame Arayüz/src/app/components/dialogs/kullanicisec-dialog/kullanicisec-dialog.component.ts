
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Kullanici } from 'src/app/models/Kullanici';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { KullaniciDialogComponent } from '../kullanicilar-dialog/kullanicilar-dialog.component';

@Component({
  selector: 'app-kullanicisec-dialog',
  templateUrl: './kullanicisec-dialog.component.html',
  styleUrls: ['./kullanicisec-dialog.component.css']
})
export class KullanicisecDialogComponent implements OnInit {

  kullanicilarlar: Kullanici[];

  displayedColumns = ['kullaniciNo', 'kullaniciAdsoyad', 'kullaniciDogTarih', 'kullaniciEpinSayisi', 'islemler'];
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService,
    public dialogRef: MatDialogRef<KullaniciDialogComponent>
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
  KullaniciSec(kullanici: Kullanici) {
    this.dialogRef.close(kullanici);
  }
}

import { KullanicisecDialogComponent } from './components/dialogs/kullanicisec-dialog/kullanicisec-dialog.component';
import { KullanicilisteleComponent } from './components/kullanicilistele/kullanicilistele.component';
import { EpinDialogComponent } from './components/dialogs/epin-dialog/epin-dialog.component';
import { EpinlisteleComponent } from './components/epinlistele/epinlistele.component';
import { KullaniciDialogComponent } from './components/dialogs/kullanicilar-dialog/kullanicilar-dialog.component';
import { EpinComponent } from './components/epin/epin.component';
import { KullaniciComponent } from './components/kullanicilar/kullanicilar.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { MyAlertService } from './services/myAlert.service';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { MaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    KullaniciComponent,
    EpinComponent,
    EpinlisteleComponent,
    KullanicilisteleComponent,

    //Dialoglar
    AlertDialogComponent,
    ConfirmDialogComponent,
    KullaniciDialogComponent,
    EpinDialogComponent,
    KullanicisecDialogComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AlertDialogComponent,
    ConfirmDialogComponent,
    KullaniciDialogComponent,
    EpinDialogComponent,
    KullanicisecDialogComponent
  ],
  providers: [MyAlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }

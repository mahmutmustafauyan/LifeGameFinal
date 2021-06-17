import { KullanicilisteleComponent } from './components/kullanicilistele/kullanicilistele.component';
import { EpinlisteleComponent } from './components/epinlistele/epinlistele.component';
import { EpinComponent } from './components/epin/epin.component';
import { KullaniciComponent } from './components/kullanicilar/kullanicilar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'kullanicilar',
    component: KullaniciComponent
  },
  {
    path: 'epin',
    component: EpinComponent
  },
  {
    path: 'epinlistele/:kullaniciId',
    component: EpinlisteleComponent
  },
  {
    path: 'kullanicilistele/:epinId',
    component: KullanicilisteleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

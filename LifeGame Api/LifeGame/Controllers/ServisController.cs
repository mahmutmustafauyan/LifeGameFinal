using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web.Http;
using vizeproje.Models;
using vizeproje.ViewModel;
namespace vizeproje.Controllers
{
    public class ServisController : ApiController
    {
        DB03Entities db = new DB03Entities();
        SonucModel sonuc = new SonucModel();

        #region Epin
        [HttpGet]
        [Route("api/epinliste")]
        public List<EpinModel> EpinListe()
        {
            List<EpinModel> liste = db.Epin.Select(x => new EpinModel()
            {
                epinId = x.epinId,
                epinKodu = x.epinKodu,
                epinAdi = x.epinAdi,
                epinFiyat = x.epinFiyat,
                epinKullaniciSayisi = x.Kayit.Count()
            }).ToList();

            return liste;
        }

        [HttpGet]
        [Route("api/epinbyid/{epinId}")]
        public EpinModel EpinById(string epinId)
        {
            EpinModel kayit = db.Epin.Where(s => s.epinId == epinId).Select(x => new EpinModel()
            {
                epinId = x.epinId,
                epinKodu = x.epinKodu,
                epinAdi = x.epinAdi,
                epinFiyat = x.epinFiyat,
                epinKullaniciSayisi = x.Kayit.Count()
            }).SingleOrDefault();

            return kayit;
        }


        [HttpPost]
        [Route("api/epinekle")]
        public SonucModel EpinEkle(EpinModel model)
        {
            if (db.Epin.Count(s => s.epinKodu == model.epinKodu) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Epin Kodu Kayıtlıdır!";
                return sonuc;
            }

            Epin yeni = new Epin();
            yeni.epinId = Guid.NewGuid().ToString();
            yeni.epinKodu = model.epinKodu;
            yeni.epinAdi = model.epinAdi;
            yeni.epinFiyat = model.epinFiyat;
            db.Epin.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Epin Eklendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/epinduzenle")]
        public SonucModel EpinDuzenle(EpinModel model)
        {
            Epin kayit = db.Epin.Where(s => s.epinId == model.epinId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            kayit.epinKodu = model.epinKodu;
            kayit.epinAdi = model.epinAdi;
            kayit.epinFiyat = model.epinFiyat;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Epin Düzenlendi";

            return sonuc;
        }

        [HttpDelete]
        [Route("api/epinsil/{epinId}")]
        public SonucModel EpinSil(string epinId)
        {
            Epin kayit = db.Epin.Where(s => s.epinId == epinId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            if (db.Kayit.Count(s => s.kayitEpinId == epinId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Epina Kayıtlı Üye Olduğu İçin Epin Silinemez!";
                return sonuc;
            }


            db.Epin.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Epin Silindi";
            return sonuc;
        }
        #endregion

        #region Kullanicilar

        [HttpGet]
        [Route("api/kullanicilarliste")]
        public List<KullanicilarModel> KullanicilarListe()
        {
            List<KullanicilarModel> liste = db.Kullanicilar.Select(x => new KullanicilarModel()
            {
                kullaniciId = x.kullaniciId,
                kullaniciNo = x.kullaniciNo,
                kullaniciAdsoyad = x.kullaniciAdsoyad,
                kullaniciDogTarih = x.kullaniciDogTarih,
                kullaniciEpinSayisi = x.Kayit.Count()
            }).ToList();
            return liste;
        }


        [HttpGet]
        [Route("api/kullanicilarbyid/{kullaniciId}")]
        public KullanicilarModel KullanicilarById(string kullaniciId)
        {
            KullanicilarModel kayit = db.Kullanicilar.Where(s => s.kullaniciId == kullaniciId).Select(x => new KullanicilarModel()
            {
                kullaniciId = x.kullaniciId,
                kullaniciNo = x.kullaniciNo,
                kullaniciAdsoyad = x.kullaniciAdsoyad,
                kullaniciDogTarih = x.kullaniciDogTarih,
                kullaniciEpinSayisi = x.Kayit.Count()
            }).SingleOrDefault();
            return kayit;
        }

        [HttpPost]
        [Route("api/kullanicilarekle")]
        public SonucModel KullanicilarEkle(KullanicilarModel model)
        {
            if (db.Kullanicilar.Count(s => s.kullaniciNo == model.kullaniciNo) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Üye Numarası Kayıtlıdır!";
                return sonuc;
            }

            Kullanicilar yeni = new Kullanicilar();
            yeni.kullaniciId = Guid.NewGuid().ToString();
            yeni.kullaniciNo = model.kullaniciNo;
            yeni.kullaniciAdsoyad = model.kullaniciAdsoyad;
            yeni.kullaniciDogTarih = model.kullaniciDogTarih;
            db.Kullanicilar.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Üye Eklendi";
            return sonuc;
        }


        [HttpPut]
        [Route("api/kullanicilarduzenle")]
        public SonucModel KullanicilarDuzenle(KullanicilarModel model)
        {
            Kullanicilar kayit = db.Kullanicilar.Where(s => s.kullaniciId == model.kullaniciId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            kayit.kullaniciNo = model.kullaniciNo;
            kayit.kullaniciAdsoyad = model.kullaniciAdsoyad;
            kayit.kullaniciDogTarih = model.kullaniciDogTarih;
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Üye Düzenlendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/kullanicilarsil/{kullaniciId}")]
        public SonucModel KullanicilarSil(string kullaniciId)
        {
            Kullanicilar kayit = db.Kullanicilar.Where(s => s.kullaniciId == kullaniciId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            if (db.Kayit.Count(s => s.kayitKullaniciId == kullaniciId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üyenin Üzerinde Epin Kaydı Olduğu İçin Üye Silinemez!";
                return sonuc;
            }

            db.Kullanicilar.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Üye Silindi";
            return sonuc;
        }

        

        #endregion

        #region Kayit

        [HttpGet]
        [Route("api/kullanicilarepinliste/{kullaniciId}")]
        public List<KayitModel> KullanicilarEpinListe(string kullaniciId)
        {
            List<KayitModel> liste = db.Kayit.Where(s => s.kayitKullaniciId == kullaniciId).Select(x => new KayitModel()
            {
                kayitId = x.kayitId,
                kayitEpinId = x.kayitEpinId,
                kayitKullaniciId = x.kayitKullaniciId,

            }).ToList();

            foreach (var kayit in liste)
            {
                kayit.kullaniciBilgi = KullanicilarById(kayit.kayitKullaniciId);
                kayit.epinBilgi = EpinById(kayit.kayitEpinId);
            }
            return liste;
        }

        [HttpGet]
        [Route("api/epinkullanicilarliste/{epinId}")]
        public List<KayitModel> EpinKullanicilarListe(string epinId)
        {
            List<KayitModel> liste = db.Kayit.Where(s => s.kayitEpinId == epinId).Select(x => new KayitModel()
            {
                kayitId = x.kayitId,
                kayitEpinId = x.kayitEpinId,
                kayitKullaniciId = x.kayitKullaniciId,

            }).ToList();

            foreach (var kayit in liste)
            {
                kayit.kullaniciBilgi = KullanicilarById(kayit.kayitKullaniciId);
                kayit.epinBilgi = EpinById(kayit.kayitEpinId);
            }
            return liste;
        }

        [HttpPost]
        [Route("api/kayitekle")]
        public SonucModel KayitEkle(KayitModel model)
        {
            if (db.Kayit.Count(s => s.kayitEpinId == model.kayitEpinId && s.kayitKullaniciId == model.kayitKullaniciId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "İlgili Üye Epine Önceden Kayıtlıdır!";
                return sonuc;
            }

            Kayit yeni = new Kayit();
            yeni.kayitId = Guid.NewGuid().ToString();
            yeni.kayitKullaniciId = model.kayitKullaniciId;
            yeni.kayitEpinId = model.kayitEpinId;
            db.Kayit.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Epin Kaydı Eklendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/kayitsil/{kayitId}")]
        public SonucModel KayitSil(string kayitId)
        {
            Kayit kayit = db.Kayit.Where(s => s.kayitId == kayitId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }
            db.Kayit.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Epin Kaydı Silindi";
            return sonuc;
        }
        #endregion


    }
}

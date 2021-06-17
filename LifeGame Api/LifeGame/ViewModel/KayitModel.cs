namespace vizeproje.ViewModel
{
    public class KayitModel
    {
        public string kayitId { get; set; }
        public string kayitEpinId { get; set; }
        public string kayitKullaniciId { get; set; }
        public KullanicilarModel kullaniciBilgi { get; set; }
        public EpinModel epinBilgi { get; set; }
    }
}

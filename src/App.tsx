import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Star,
  Activity, 
  Zap,
  Target,
  Menu, 
  X,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Linkedin
} from 'lucide-react';
import { cn } from './lib/utils';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// --- Components ---

const PilatesSlider = () => {
  const slides = [
    { 
      img: "https://lh3.googleusercontent.com/d/177BntrnlQTMMkpvpxIT6ScWxXIJhK8Jy=s2048",
      title: "KLİNİK PİLATES",
      subtitle: "Vücudunuzu esnetin, merkezinizi güçlendirin."
    },
    { 
      img: "https://lh3.googleusercontent.com/d/1vRSIjLFmAWMrtmWZs7PMNnpkpfoHDARt=s2048",
      title: "EMS VE TEKNOLOJİ",
      subtitle: "Geleceğin antrenman sistemleri ile tanışın."
    },
    { 
      img: "https://lh3.googleusercontent.com/d/1d2PCvv9nKZftS6jUWjEexMjknfqPjH9k=s2048",
      title: "BİYOREZONANS",
      subtitle: "Vücut frekanslarını dengeleyerek iştah kontrolü."
    }
  ];

  return (
    <div className="h-[60vh] md:h-[80vh] w-full relative group select-none">
      <Swiper
        key="pilates-slider"
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        speed={800}
        loop={true}
        className="h-full w-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative h-full w-full overflow-hidden">
              <img 
                src={slide.img} 
                className="h-full w-full object-cover transition-transform duration-700" 
                alt="Fitness" 
                referrerPolicy="no-referrer" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter drop-shadow-2xl"
                >
                  {slide.title}
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                  className="text-lg md:text-xl text-brand-neon font-bold uppercase tracking-widest drop-shadow-lg"
                >
                  {slide.subtitle}
                </motion.p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const Button = ({ 
  children, 
  className, 
  variant = 'primary', 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' | 'ghost' }) => {
  const variants = {
    primary: 'bg-brand-neon text-black hover:bg-opacity-90 shadow-[0_0_20px_rgba(57,255,20,0.3)]',
    secondary: 'bg-white text-black hover:bg-gray-100',
    outline: 'border border-white/20 text-white hover:bg-white/10',
    ghost: 'text-white hover:bg-white/5'
  };

  return (
    <button 
      className={cn(
        'px-8 py-4 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 active:scale-95',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className, ...props }: { children: React.ReactNode, className?: string } & React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm', className)} {...props}>
    {children}
  </div>
);

// --- Sections ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
      isScrolled ? 'bg-brand-dark/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 group-hover:scale-110 transition-transform">
            <img 
              src="https://lh3.googleusercontent.com/d/1AXuRtmnSbETxcPl2ADUPyAdle2SHvq3g" 
              alt="Virafit Logo" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = "https://picsum.photos/seed/virafit-logo/100/100";
              }}
            />
          </div>
          <span className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">VİRAFİT</span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          <Link 
            to="/" 
            className={cn(
              "text-xs font-bold uppercase tracking-widest transition-colors focus:outline-none select-none cursor-pointer",
              pathname === "/" ? "text-brand-neon" : "text-white hover:text-brand-neon"
            )}
          >
            ANASAYFA
          </Link>
          <Link 
            to="/services" 
            className={cn(
              "text-xs font-bold uppercase tracking-widest transition-colors focus:outline-none select-none cursor-pointer",
              pathname === "/services" ? "text-brand-neon" : "text-white hover:text-brand-neon"
            )}
          >
            HİZMETLERİMİZ
          </Link>
          <Link 
            to="/about" 
            className={cn(
              "text-xs font-bold uppercase tracking-widest transition-colors focus:outline-none select-none cursor-pointer",
              pathname === "/about" ? "text-brand-neon" : "text-white hover:text-brand-neon"
            )}
          >
            HAKKIMIZDA
          </Link>
          <Link 
            to="/contact" 
            className={cn(
              "text-xs font-bold uppercase tracking-widest transition-colors focus:outline-none select-none cursor-pointer",
              pathname === "/contact" ? "text-brand-neon" : "text-white hover:text-brand-neon"
            )}
          >
            İLETİŞİM
          </Link>
        </div>

        <button className="lg:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-brand-dark border-b border-white/10 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col gap-6 p-8">
              <Link to="/" className="text-sm font-bold uppercase tracking-widest" onClick={() => setIsMobileMenuOpen(false)}>ANASAYFA</Link>
              <Link to="/services" className="text-sm font-bold uppercase tracking-widest" onClick={() => setIsMobileMenuOpen(false)}>HİZMETLERİMİZ</Link>
              <Link to="/about" className="text-sm font-bold uppercase tracking-widest" onClick={() => setIsMobileMenuOpen(false)}>HAKKIMIZDA</Link>
              <Link to="/contact" className="text-sm font-bold uppercase tracking-widest" onClick={() => setIsMobileMenuOpen(false)}>İLETİŞİM</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center px-6 scroll-mt-20">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
          className="w-full h-full object-cover brightness-75" 
          alt="Fitness"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-transparent to-brand-dark" />
      </div>
      
      <div className="relative z-10 text-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] uppercase mb-8 text-white">
            EN HIZLI SONUÇ İÇİN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-neon to-brand-pink glow-neon">
              DOĞRU YERDESİN
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            EMS, Biyorezonans ve kişiye özel pilates ile kısa sürede gözle görülür değişim.
          </p>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-2"
        >
          <div className="w-1 h-2 bg-brand-neon rounded-full" />
        </motion.div>
      </div>
    </section>
  );
};

const AboutUs = () => {
  return (
    <section id="about" className="py-32 px-6 relative overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-brand-neon font-black uppercase tracking-[0.3em] text-xs mb-4">Biz Kimiz?</p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-8 text-white">
              GELECEĞİN FİTNESS <br /> <span className="text-brand-pink">DENEYİMİ</span>
            </h2>
            
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p className="text-xl font-medium text-white">
                VİRAFİT KURTKÖY YENİŞEHİR PENDİK İSTANBUL'da bulunan üyelerine, bireysel ihtiyaçlarını karşılamak amacıyla kısa sürede sonuç veren; son teknoloji cihazlar ile destek ve diyetisyen takipli beslenme programları sunmaktadır.
              </p>
              <p>
                Kişisel antrenörlerimiz ve beslenme uzmanlarımızdan oluşan ekibimiz, sağlık ve fitness hedeflerinize ulaşmanız için size özel bir program oluşturmak üzere sizinle birlikte çalışacak; tüm bunları isterseniz kendi evinizin, ofisinizin rahatlığında veya özel butik stüdyomuzda gerçekleştirebilirsiniz. Sizi motive edeceğiz ve en iyi halinize ulaşmanıza yardımcı olmak için yanınızda olacağız.
              </p>
              
              <div className="pt-8 border-t border-white/10">
                <h3 className="text-2xl font-black text-brand-neon uppercase mb-4">Misyonumuz</h3>
                <p>
                  Misyonumuz, herkese sağlık ve fitness hedeflerine ulaşma fırsatı sunmaktır. Kendinizin en iyi halinizi yaşamanız için gereken desteği vermek için yanınızda olmak amacındayız.
                </p>
              </div>

              <div className="pt-8">
                <p className="text-lg italic text-brand-pink font-bold">
                  Geleneksel spor salonlarına veda edin ve fitness devriminize hazır olun!
                </p>
                <p className="mt-4">
                  Virafit Sinem Karaca'da FDA onaylı denenmiş sonuçları kanıtlanmış cihazlar ve beslenme programı sizi bekliyor. Her zaman yanınızda olan eğitmenlerimizle eğlenirken kilo verin; ister açık havada, ister sadece sizin için özel bir EMS antrenmanında olun.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <Card className="bg-white/[0.02] border-brand-neon/20">
              <h3 className="text-xl font-black text-brand-neon uppercase mb-6">Virafit Zayıflama</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-center gap-3"><Zap size={16} className="text-brand-neon" /> Kas kütlesi oluşturun ve yağ yakın.</li>
                <li className="flex items-center gap-3"><Zap size={16} className="text-brand-neon" /> Metabolizmayı hızlandırın.</li>
                <li className="flex items-center gap-3"><Zap size={16} className="text-brand-neon" /> Seans başına sadece 25 dakika.</li>
                <li className="flex items-center gap-3"><Zap size={16} className="text-brand-neon" /> Zaman kazanın.</li>
              </ul>
            </Card>

            <Card className="bg-white/[0.02] border-brand-pink/20">
              <h3 className="text-xl font-black text-brand-pink uppercase mb-6">EMS ve Geleneksel Yöntemlerin Kombinasyonu</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-center gap-3"><Activity size={16} className="text-brand-pink" /> Hızlı kardiyovasküler fitness.</li>
                <li className="flex items-center gap-3"><Activity size={16} className="text-brand-pink" /> Hızlandırılmış kilo kaybı.</li>
                <li className="flex items-center gap-3"><Activity size={16} className="text-brand-pink" /> Sık eğitim seansları.</li>
                <li className="flex items-center gap-3"><Activity size={16} className="text-brand-pink" /> Hızlı ve etkili sonuçlar.</li>
              </ul>
            </Card>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <Card className="bg-brand-surface/50">
            <h4 className="text-lg font-black text-white uppercase mb-4">Ekibimiz Size Destek Olurken:</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>• Danışmanlık görüşmesi gerçekleştirme</li>
              <li>• Haftalık kilo verme programı</li>
              <li>• Stüdyoda veya evinizde seanslar</li>
              <li>• Egzersiz ve beslenme programı oluşturma</li>
            </ul>
          </Card>
          
          <Card className="bg-brand-surface/50">
            <h4 className="text-lg font-black text-white uppercase mb-4">Sporcular İçin:</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>• Özelleştirilmiş çapraz eğitim</li>
              <li>• Hız ve güç geliştirme</li>
              <li>• Daha fazla dayanıklılık</li>
              <li>• Kişiye özel spor beslenmesi</li>
            </ul>
            <p className="mt-4 text-xs font-bold text-brand-neon uppercase">İlk eğitim seansınız bizden!</p>
          </Card>

          <Card className="bg-brand-surface/50">
            <h4 className="text-lg font-black text-white uppercase mb-4">EMS Eğitim Programı:</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Sadece 25 dakikalık EMS antrenmanı ile kişiye özel, tüm vücudu çalıştıran bir güç ve fitness çözümü sunuyoruz. Haftada sadece iki (2) seans, spor salonunda 4-5 saatlik antrenmanla aynı sonuçları verir.
            </p>
          </Card>
        </div>

        <div className="mt-20 p-12 rounded-[3rem] bg-gradient-to-r from-brand-neon/10 to-brand-pink/10 border border-white/10">
          <p className="text-gray-300 leading-relaxed italic">
            "VİRAFİT KİŞİSEL ANTRENÖRLERİMİZ, daha az zaman harcayarak daha hızlı sonuçlar veren yüksek yoğunluklu aralıklı bir antrenman sunacak. Elektrik uyarıları, eklem aşırı yüklenmelerini ve kas yaralanmalarını önleyerek kasları doğrudan uyarır. Bu uyarılar sadece yüzeysel değil, aynı zamanda derin kas dokusunu da uyararak sırt ağrıları gibi kas-iskelet sistemi ağrılarının hafifletilmesine yardımcı olur."
          </p>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "EMS Antrenmanı",
      desc: "20 dakikada 4 saatlik antrenman etkisi.",
      img: "https://lh3.googleusercontent.com/d/1vRSIjLFmAWMrtmWZs7PMNnpkpfoHDARt=s1024",
      tag: "Popüler"
    },
    {
      title: "Biyorezonans",
      desc: "Vücut frekanslarını dengeleyerek iştah kontrolü.",
      img: "https://lh3.googleusercontent.com/d/1d2PCvv9nKZftS6jUWjEexMjknfqPjH9k=s1024",
      tag: "Teknolojik"
    },
    {
      title: "Klinik Pilates",
      desc: "Esneklik ve merkez bölge güçlendirme.",
      img: "https://lh3.googleusercontent.com/d/177BntrnlQTMMkpvpxIT6ScWxXIJhK8Jy=s1024",
      tag: "Denge"
    },
    {
      title: "Bölgesel İncelme",
      desc: "Hedef odaklı cihazlarla yağ yakımı.",
      img: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=2000&auto=format&fit=crop",
      tag: "Odaklı"
    }
  ];

  return (
    <section id="services" className="py-32 px-6 bg-brand-surface/30 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <p className="text-brand-neon font-black uppercase tracking-[0.3em] text-xs mb-4">Neler Yapıyoruz?</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] text-white">
              HİZMETLERİMİZ <br /> <span className="text-brand-pink">GÜÇLENİN</span>
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative h-[400px] rounded-[3rem] overflow-hidden border border-white/5"
            >
              <img 
                src={service.img} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
                alt={service.title}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent" />
              
              <div className="absolute inset-0 p-12 flex flex-col justify-end">
                <span className="inline-block px-4 py-1 rounded-full bg-brand-neon/20 text-brand-neon text-[10px] font-black uppercase tracking-widest mb-4 w-fit">
                  {service.tag}
                </span>
                <h3 className="text-3xl font-black uppercase tracking-tight mb-4 text-white">{service.title}</h3>
                <p className="text-gray-300 max-w-md leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {service.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="bg-brand-dark pt-20 min-h-screen flex flex-col scroll-mt-20">
      <PilatesSlider />
      
      {/* Aesthetic Gap & Title */}
      <div className="relative py-24 px-6 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-brand-neon to-transparent opacity-50" />
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-brand-neon/5 blur-[120px] rounded-full" />
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-brand-pink/5 blur-[120px] rounded-full" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-brand-neon font-black uppercase tracking-[0.4em] text-[10px] mb-6"
          >
            Bize Ulaşın
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] text-white"
          >
            SİZİ BEKLİYORUZ <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-neon to-brand-pink">
              KURTKÖY STÜDYOMUZ
            </span>
          </motion.h2>
        </div>
      </div>

      {/* Map Section with Professional Spacing */}
      <div className="px-6 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto h-[350px] md:h-[450px] rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)] relative group"
        >
          <div className="absolute inset-0 bg-brand-neon/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
          <iframe 
            src="https://maps.google.com/maps?q=Kurtköy%20Yenişehir%20Pendik%20İstanbul&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="relative z-0"
          ></iframe>
        </motion.div>
      </div>

      {/* Contact Form Section */}
      <div className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-brand-neon font-bold uppercase tracking-widest mb-4">Sorularınız mı var?</p>
            <h2 className="text-5xl font-black uppercase tracking-tighter">Bize Ulaşın</h2>
          </div>
          
          <Card className="p-10 border-white/10 bg-white/[0.03]">
            <form 
              className="space-y-6" 
              action="https://formspree.io/f/emtslimkurtkoy@gmail.com" 
              method="POST"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Tam Adınız</label>
                  <input name="name" type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-brand-neon transition-all" placeholder="Ad Soyad" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Telefon Numarası</label>
                  <input name="phone" type="tel" required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-brand-neon transition-all" placeholder="(5XX) XXX XX XX" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">E-posta Adresi</label>
                <input name="email" type="email" required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-brand-neon transition-all" placeholder="ornek@mail.com" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Mesajınız</label>
                <textarea name="message" rows={5} required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-brand-neon transition-all resize-none" placeholder="Mesajınızı buraya yazın..."></textarea>
              </div>
              <Button type="submit" className="w-full py-5 text-xl uppercase tracking-widest">Gönder</Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

const EnhancedFooter = () => {
  return (
    <footer className="bg-brand-dark border-t border-white/10 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto mb-20">
        {/* Brand Info */}
        <div className="max-w-md space-y-6">
          <div className="flex items-center gap-2">
            <Activity className="text-brand-neon w-8 h-8" />
            <span className="text-2xl font-black tracking-tighter">VİRAFİT</span>
          </div>
          <p className="text-gray-400 leading-relaxed">
            Daha sağlıklı ve güçlü bir versiyonunuza giden yolculuk burada başlıyor.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-400">
              <MapPin size={18} className="text-brand-neon" />
              <span>Kurtköy Yenişehir, Pendik, İstanbul</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <Phone size={18} className="text-brand-neon" />
              <span>(212) 555 0101</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <Mail size={18} className="text-brand-neon" />
              <span>emtslimkurtkoy@gmail.com</span>
            </div>
          </div>
          <div className="flex items-center gap-4 pt-4">
            <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-brand-neon hover:text-black transition-all"><Instagram size={20} /></a>
            <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-brand-neon hover:text-black transition-all"><Twitter size={20} /></a>
            <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-brand-neon hover:text-black transition-all"><Linkedin size={20} /></a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] text-gray-600 uppercase tracking-[0.2em] font-black">© 2026 Virafit. Tüm hakları saklıdır.</p>
      </div>
    </footer>
  );
};

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-brand-dark selection:bg-brand-neon selection:text-black">
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactSection />} />
      </Routes>
      <EnhancedFooter />
    </div>
  );
}

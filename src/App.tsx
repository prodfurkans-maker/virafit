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
  Linkedin,
  ShieldCheck,
  Home as HomeIcon,
  Building,
  Briefcase
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
      title: "BİOREZONANS",
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
            HİZMETLER
          </Link>
          <Link 
            to="/before-after" 
            className={cn(
              "text-xs font-bold uppercase tracking-widest transition-colors focus:outline-none select-none cursor-pointer",
              pathname === "/before-after" ? "text-brand-neon" : "text-white hover:text-brand-neon"
            )}
          >
            ÖNCESİ SONRASI
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
            to="/blog" 
            className={cn(
              "text-xs font-bold uppercase tracking-widest transition-colors focus:outline-none select-none cursor-pointer",
              pathname === "/blog" ? "text-brand-neon" : "text-white hover:text-brand-neon"
            )}
          >
            BLOG
          </Link>
          <Link 
            to="/appointment" 
            className={cn(
              "text-xs font-bold uppercase tracking-widest transition-colors focus:outline-none select-none cursor-pointer",
              pathname === "/appointment" ? "text-brand-neon" : "text-white hover:text-brand-neon"
            )}
          >
            ONLINE RANDEVU
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
              <Link to="/services" className="text-sm font-bold uppercase tracking-widest" onClick={() => setIsMobileMenuOpen(false)}>HİZMETLER</Link>
              <Link to="/before-after" className="text-sm font-bold uppercase tracking-widest" onClick={() => setIsMobileMenuOpen(false)}>ÖNCESİ SONRASI</Link>
              <Link to="/about" className="text-sm font-bold uppercase tracking-widest" onClick={() => setIsMobileMenuOpen(false)}>HAKKIMIZDA</Link>
              <Link to="/blog" className="text-sm font-bold uppercase tracking-widest" onClick={() => setIsMobileMenuOpen(false)}>BLOG</Link>
              <Link to="/appointment" className="text-sm font-bold uppercase tracking-widest" onClick={() => setIsMobileMenuOpen(false)}>ONLINE RANDEVU</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Home = () => {
  return (
    <main>
      <Hero />
      <ResultsSection />
      <Testimonials />
      <HomeServiceSection />
    </main>
  );
};

const ResultsSection = () => {
  return (
    <section className="py-24 px-6 bg-brand-dark">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-brand-neon font-black uppercase tracking-[0.3em] text-xs mb-4">Sonuç Odaklı Yaklaşım</p>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-12 text-white">
          ÖNCE <span className="text-brand-pink">SONUÇ</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-white/[0.02]">
            <h3 className="text-4xl font-black text-brand-neon mb-2">%93</h3>
            <p className="text-gray-400 uppercase text-xs font-bold tracking-widest">Sigara Bırakma Başarısı</p>
          </Card>
          <Card className="bg-white/[0.02]">
            <h3 className="text-4xl font-black text-brand-pink mb-2">25 DK</h3>
            <p className="text-gray-400 uppercase text-xs font-bold tracking-widest">EMS Antrenman Süresi</p>
          </Card>
          <Card className="bg-white/[0.02]">
            <h3 className="text-4xl font-black text-white mb-2">KİŞİYE ÖZEL</h3>
            <p className="text-gray-400 uppercase text-xs font-bold tracking-widest">Dönüşüm Planı</p>
          </Card>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    { name: "Ayşe Y.", text: "EMS ile 2 ayda inanılmaz bir sıkılaşma yaşadım. Sinem Hanım'ın ilgisi harika.", rating: 5 },
    { name: "Mehmet K.", text: "Biorezonans ile sigarayı tek seansta bıraktım. Hiç zorlanmadım, herkese tavsiye ederim.", rating: 5 },
    { name: "Selin B.", text: "Tatlı krizlerim Biorezonans sayesinde bitti. Kendimi çok daha enerjik hissediyorum.", rating: 5 },
  ];

  return (
    <section className="py-24 px-6 bg-brand-surface/20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-black uppercase tracking-tighter mb-12 text-center text-white">DANIŞAN YORUMLARI</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <Card key={i} className="flex flex-col gap-4">
              <div className="flex gap-1">
                {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} className="fill-brand-neon text-brand-neon" />)}
              </div>
              <p className="text-gray-300 italic">"{review.text}"</p>
              <p className="font-bold text-white">- {review.name}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const HomeServiceSection = () => {
  return (
    <section className="py-32 px-6 bg-brand-dark relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-neon/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-pink/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-brand-neon font-black uppercase tracking-[0.3em] text-xs">
                <ShieldCheck size={16} />
                <span>Güvenilir & Profesyonel</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.85] text-white">
                EVİNİZİN <br /> KONFORUNDA <br />
                <span className="text-brand-neon">HİZMET ALIN</span>
              </h2>
            </div>

            <p className="text-xl text-gray-400 leading-relaxed max-w-lg">
              Tüm seanslarımızı kendi evinizin veya ofisinizin rahatlığında gerçekleştirebiliriz. Size en uygun ortamda, en yüksek verimi hedefliyoruz.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-3 p-6 bg-white/5 rounded-3xl border border-white/10 hover:border-brand-neon/30 transition-colors group">
                <div className="w-12 h-12 rounded-2xl bg-brand-neon/10 flex items-center justify-center text-brand-neon group-hover:scale-110 transition-transform">
                  <HomeIcon size={24} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-white">Evde</span>
              </div>
              <div className="flex flex-col gap-3 p-6 bg-white/5 rounded-3xl border border-white/10 hover:border-brand-neon/30 transition-colors group">
                <div className="w-12 h-12 rounded-2xl bg-brand-neon/10 flex items-center justify-center text-brand-neon group-hover:scale-110 transition-transform">
                  <Briefcase size={24} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-white">Ofiste</span>
              </div>
            </div>

            <div className="pt-4">
              <Link to="/appointment">
                <Button className="group">
                  RANDEVU AL
                  <Activity className="group-hover:animate-pulse" size={18} />
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Image Container with decorative borders */}
            <div className="relative z-10 rounded-[4rem] overflow-hidden aspect-[4/5] border-2 border-white/10 shadow-2xl">
              <img 
                src="https://lh3.googleusercontent.com/d/1cMc9DjYTWf2CfD5wahX0h5TU4Vs6UpCY=s1024" 
                className="w-full h-full object-cover brightness-90 hover:scale-105 transition-transform duration-1000" 
                alt="Home Service"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent" />
              
              {/* Floating Badge */}
              <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-neon flex items-center justify-center text-black">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Profesyonel Ekip</p>
                  <p className="text-gray-300 text-xs uppercase tracking-widest">Sertifikalı Uzmanlar</p>
                </div>
              </div>
            </div>

            {/* Decorative background shape */}
            <div className="absolute -top-6 -right-6 w-full h-full border-2 border-brand-neon/20 rounded-[4rem] -z-10" />
            <div className="absolute -bottom-6 -left-6 w-full h-full border-2 border-brand-pink/20 rounded-[4rem] -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ServicesPage = () => {
  return (
    <div className="pt-24">
      <Services />
      <DetailedServices />
    </div>
  );
};

const DetailedServices = () => {
  return (
    <section className="py-24 px-6 bg-brand-dark">
      <div className="max-w-7xl mx-auto space-y-32">
        {/* Biorezonans */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl font-black text-brand-neon uppercase mb-6">MORA BİOREZONANS</h2>
            <div className="space-y-4 text-gray-300">
              <p className="text-xl font-bold text-white">Kendini Zorlamadan Zayıflamak Mümkün</p>
              <p>Diyetlere başlayıp yarım bırakıyor musun? Tatlı krizleri ve sürekli açlık hissi seni zorluyor mu? Mora biorezonans ile vücudunun dengesini yeniden kurarak, kilo verme sürecini daha kolay ve sürdürülebilir hale getirebilirsin.</p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-brand-neon font-bold text-sm mb-1">İştah Kontrolü</p>
                  <p className="text-xs text-gray-400">Tatlı ve karbonhidrat isteğini azaltır.</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-brand-neon font-bold text-sm mb-1">Gıda Silme</p>
                  <p className="text-xs text-gray-400">Bağımlılık yapan gıdalara karşı isteği azaltır.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 h-[500px] rounded-[3rem] overflow-hidden bg-white/5">
            <img src="https://lh3.googleusercontent.com/d/18IYD9CZ8D0QfWRh6W-Oc7uFvmZCQJ_BB=s2048" className="w-full h-full object-contain" alt="Biorezonans" referrerPolicy="no-referrer" />
          </div>
        </div>

        {/* Sigara Bırakma */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="h-[500px] rounded-[3rem] overflow-hidden">
            <img src="https://lh3.googleusercontent.com/d/1te2XAWYxXjW8hEuf848Qd-uuB_KDOSm4=s2048" className="w-full h-full object-cover" alt="Sigara Bırakma" referrerPolicy="no-referrer" />
          </div>
          <div>
            <h2 className="text-4xl font-black text-brand-neon uppercase mb-6">SİGARA BIRAKMA</h2>
            <div className="space-y-4 text-gray-300">
              <h4 className="text-xl font-bold text-white mb-2">Sigara Bırakmak Artık Daha Kolay</h4>
              <p>Mora biorezonans ile sigara isteğini azaltmaya ve bırakma sürecini daha konforlu hale getirmeye destek oluyoruz. %93 başarı oranı ile tek seansta özgürlüğe adım atın.</p>
              <ul className="space-y-2 pt-4">
                <li className="flex items-center gap-2"><Zap size={16} className="text-brand-neon" /> Tek seansta etkili sonuç</li>
                <li className="flex items-center gap-2"><Zap size={16} className="text-brand-neon" /> Yoksunluk belirtilerini minimize eder</li>
                <li className="flex items-center gap-2"><Zap size={16} className="text-brand-neon" /> Tamamen doğal ve yan etkisiz</li>
              </ul>
            </div>
          </div>
        </div>

        {/* EMS */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="h-[600px] rounded-[3rem] overflow-hidden bg-white/5">
            <img src="https://lh3.googleusercontent.com/d/1Qk-UsEpE5db_JJVnU-n3cUwt6m33_npo=s2048" className="w-full h-full object-contain" alt="EMS" referrerPolicy="no-referrer" />
          </div>
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-black text-brand-pink uppercase mb-6">EMS ANTRENMAN</h2>
              <div className="space-y-4 text-gray-300">
                <p className="text-xl font-bold text-white">EMS Nedir ve Nasıl Çalışır?</p>
                <p>EMS (Elektriksel Kas Stimülasyonu), kasları dışarıdan gönderilen düşük frekanslı elektrik sinyalleri ile uyararak kasılmalarını sağlayan gelişmiş bir teknolojidir. Sadece 25 dakika sürer ve bu da 4 saatlik geleneksel kuvvet antrenmanından daha etkilidir.</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2"><Zap size={16} className="text-brand-pink" /> Kısa sürede yüksek kas aktivasyonu</li>
                  <li className="flex items-center gap-2"><Zap size={16} className="text-brand-pink" /> Derin kas gruplarını çalıştırır</li>
                  <li className="flex items-center gap-2"><Zap size={16} className="text-brand-pink" /> Eklemleri zorlamadan güçlenme</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-brand-pink font-bold text-sm mb-1 uppercase">Faydaları</p>
                <ul className="text-[10px] text-gray-400 space-y-1">
                  <li>• Kas Güçlendirme</li>
                  <li>• Vücut Şekillendirme</li>
                  <li>• Metabolizma Hızlandırma</li>
                  <li>• Duruş İyileştirme</li>
                </ul>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-brand-pink font-bold text-sm mb-1 uppercase">Sıkça Sorulanlar</p>
                <div className="space-y-2">
                  <div>
                    <p className="text-[10px] text-white font-bold">Ağrılı mı?</p>
                    <p className="text-[9px] text-gray-500">Hayır, yoğun ama konforludur.</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-white font-bold">Sonuç?</p>
                    <p className="text-[9px] text-gray-500">8-12 seans düzenli kullanım.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-brand-pink/5 rounded-3xl border border-brand-pink/20">
              <p className="text-white font-bold mb-2 uppercase text-sm">Zayıflama ve Şekillenme</p>
              <p className="text-xs text-gray-400 leading-relaxed">
                EMS doğrudan yağ yakmaz ancak kas kütlesini artırarak metabolizmayı hızlandırır. Karın, bel, kalça ve bacak bölgelerinde hızlı sıkılaşma sağlar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutPage = () => {
  return (
    <div className="pt-24">
      <AboutSection />
      <StorySection />
    </div>
  );
};

const StorySection = () => {
  return (
    <section className="py-24 px-6 bg-brand-surface/10">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-black uppercase mb-8 text-white">HİKAYEMİZ</h2>
        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
          <p>
            Virafit, herkese aynı programı uygulayan bir spor salonu değil; bedeni anlayan, değişimi planlayan kişiye özel bir dönüşüm stüdyosudur. Her beden farklıdır. Bu yüzden Virafit’te her program, sana özel olarak planlanır.
          </p>
          <p>
            Burası bir spor salonu değil… Beden değişimi ve dengeleme stüdyosu. Saatlerce spor yapmak zorunda değilsin. Önemli olan doğru kas aktivasyonu ve doğru planlama.
          </p>
          <p className="text-brand-neon font-bold">
            Virafit ile bedenini yeniden keşfet, gücünü geri kazan.
          </p>
        </div>
      </div>
    </section>
  );
};

const BeforeAfterPage = () => {
  return (
    <div className="pt-32 px-6 min-h-screen bg-brand-dark">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-12 text-white">ÖNCESİ <span className="text-brand-pink">SONRASI</span></h1>
        <p className="text-xl text-gray-400 mb-16">Gerçek değişim, gerçek sonuçlar. Yakında burada daha fazla başarı hikayesi paylaşacağız.</p>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-video bg-white/5 rounded-[3rem] flex items-center justify-center border border-white/10">
              <p className="text-gray-500 font-bold uppercase tracking-widest">Görsel Yakında</p>
            </div>
            <p className="text-white font-bold">2 Ayda -12 KG Kaybı</p>
          </div>
          <div className="space-y-4">
            <div className="aspect-video bg-white/5 rounded-[3rem] flex items-center justify-center border border-white/10">
              <p className="text-gray-500 font-bold uppercase tracking-widest">Görsel Yakında</p>
            </div>
            <p className="text-white font-bold">Bölgesel İncelme ve Sıkılaşma</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogPage = () => {
  const posts = [
    { title: "Biorezonans ile Sigara Bırakma", date: "20 Mart 2026", excerpt: "Sigara bağımlılığından kurtulmak artık çok daha kolay. Mora terapi ile tek seansta özgürlüğe adım atın." },
    { title: "EMS Antrenmanının Avantajları", date: "15 Mart 2026", excerpt: "Haftada sadece 25 dakika ayırarak nasıl fit kalabilirsiniz? EMS teknolojisinin detayları." },
    { title: "Sağlıklı Beslenme İpuçları", date: "10 Mart 2026", excerpt: "Diyetisyenimizden kilo verme sürecinizi hızlandıracak altın öneriler." },
  ];

  return (
    <div className="pt-32 px-6 min-h-screen bg-brand-dark">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-16 text-white">VİRAFİT <span className="text-brand-neon">BLOG</span></h1>
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <Card key={i} className="hover:border-brand-neon transition-colors cursor-pointer group">
              <p className="text-xs text-brand-neon font-bold mb-2">{post.date}</p>
              <h3 className="text-2xl font-black text-white mb-4 group-hover:text-brand-neon transition-colors uppercase">{post.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">{post.excerpt}</p>
              <p className="text-white font-bold text-xs uppercase tracking-widest">Devamını Oku →</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

const AppointmentPage = () => {
  return (
    <div className="pt-32 px-6 min-h-screen bg-brand-dark">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4 text-white">RANDEVU <span className="text-brand-neon">AL</span></h1>
          <p className="text-xl text-gray-400">Size özel dönüşüm planını birlikte belirleyelim.</p>
        </div>
        <Card className="p-10 border-brand-neon/20 bg-white/[0.03]">
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Ad Soyad</label>
                <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-brand-neon transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Telefon</label>
                <input type="tel" required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-brand-neon transition-all" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Hizmet Seçiniz</label>
              <select defaultValue="" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-brand-neon transition-all text-white">
                <option value="" disabled className="bg-brand-surface">Hizmet Seçiniz</option>
                <option value="ems" className="bg-brand-surface">EMS Antrenmanı</option>
                <option value="biorezonans" className="bg-brand-surface">Biorezonans</option>
                <option value="diet" className="bg-brand-surface">Diyetisyen</option>
                <option value="meridyen" className="bg-brand-surface">Meridyen Terapi</option>
                <option value="slimming" className="bg-brand-surface">Zayıflama Cihazları</option>
                <option value="pilates" className="bg-brand-surface">Klinik Pilates</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Tercih Edilen Tarih</label>
              <input type="date" required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-brand-neon transition-all text-white" />
            </div>
            <Button className="w-full py-5 text-xl uppercase tracking-widest">RANDEVU TALEBİ GÖNDER</Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

const Hero = () => {
  const [currentImage, setCurrentImage] = React.useState(0);
  const images = [
    { url: "https://lh3.googleusercontent.com/d/1FieZlYjC32xrYOffY4PJwvLjf2oqtyxK=s2048", alt: "EMS Antrenman" },
    { url: "https://lh3.googleusercontent.com/d/18IYD9CZ8D0QfWRh6W-Oc7uFvmZCQJ_BB=s2048", alt: "Biorezonans" },
    { url: "https://lh3.googleusercontent.com/d/177BntrnlQTMMkpvpxIT6ScWxXIJhK8Jy=s2048", alt: "Klinik Pilates" }
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center px-6 scroll-mt-20">
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.img 
            key={currentImage}
            src={images[currentImage].url} 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="w-full h-full object-cover brightness-50" 
            alt={images[currentImage].alt}
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-transparent to-brand-dark" />
      </div>
      
      <div className="relative z-10 text-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] uppercase mb-8 text-white">
            KENDİNİ ZORLAMADAN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-neon to-brand-pink glow-neon">
              ZAYIFLAMAK MÜMKÜN
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Mora Biorezonans, EMS ve kişiye özel beslenme programları ile vücudunuzun dengesini yeniden kurun. <br />
            <span className="text-brand-neon font-bold">Stüdyomuzda veya evinizin konforunda!</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/appointment">
              <Button className="w-full sm:w-auto">ONLINE RANDEVU</Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" className="w-full sm:w-auto">HİZMETLERİMİZİ İNCELE</Button>
            </Link>
          </div>
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

const AboutSection = () => {
  return (
    <section id="about" className="py-32 px-6 relative overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-brand-neon font-black uppercase tracking-[0.3em] text-xs mb-4">Hakkımızda</p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-8 text-white">
              VİRAFİT İLE <br /> <span className="text-brand-pink">BEDENİNİ</span> YENİDEN KEŞFET
            </h2>
            
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p className="text-xl font-medium text-white">
                Virafit, herkese aynı programı uygulayan bir spor salonu değil; bedeni anlayan, değişimi planlayan kişiye özel bir dönüşüm stüdyosudur.
              </p>
              <p>
                Her beden farklıdır. Bu yüzden Virafit’te her program, sana özel olarak planlanır. Saatlerce spor yapmak zorunda değilsin. Önemli olan doğru kas aktivasyonu ve doğru planlama.
              </p>
              
              <div className="pt-8 border-t border-white/10">
                <h3 className="text-2xl font-black text-brand-neon uppercase mb-4">Neden Virafit?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Zap size={20} className="text-brand-neon shrink-0 mt-1" />
                    <span>Kişiye özel beden yönetimi ve bilimsel temelli uygulamalar.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap size={20} className="text-brand-neon shrink-0 mt-1" />
                    <span>Randevu sistemiyle çalışan butik VIP stüdyo deneyimi.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap size={20} className="text-brand-neon shrink-0 mt-1" />
                    <span>Kalabalıktan uzak, tamamen sana odaklı bir süreç.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <p className="text-lg italic text-brand-pink font-bold">
                  Burası bir spor salonu değil… Beden değişimi ve dengeleme stüdyosu.
                </p>
                <p className="mt-4">
                  Doğru analiz + doğru plan = gerçek sonuç. Seni daha hafif bir vücut, rahatlamış bir dolaşım ve enerjik bir yaşam bekliyor.
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
            <div className="relative rounded-[3rem] overflow-hidden aspect-[4/5] border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop" 
                className="w-full h-full object-cover" 
                alt="Sinem Karaca"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "EMS Antrenmanı",
      desc: "20 dakikada 4 saatlik antrenman etkisi. Evinizde veya stüdyomuzda.",
      img: "https://lh3.googleusercontent.com/d/1Qk-UsEpE5db_JJVnU-n3cUwt6m33_npo=s1024",
      tag: "Popüler"
    },
    {
      title: "Biorezonans",
      desc: "Vücut frekanslarını dengeleyerek iştah kontrolü ve sigara bırakma.",
      img: "https://lh3.googleusercontent.com/d/1IltVRPLXiGYFEK9rOV058vstmDxgvCTC=s1024",
      tag: "Teknolojik"
    },
    {
      title: "Diyetisyen",
      desc: "Kişiye özel beslenme programları ve uzman takibi.",
      img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2070&auto=format&fit=crop",
      tag: "Beslenme"
    },
    {
      title: "Meridyen Terapi",
      desc: "Vücut enerjisini dengeleyen özel masaj terapisi.",
      img: "https://lh3.googleusercontent.com/d/11TEHOK1eoSn8aZw0iky5h1ejBFszvDuU=s1024",
      tag: "Terapi"
    },
    {
      title: "Zayıflama Cihazları",
      desc: "Son teknoloji cihazlarla bölgesel incelme ve sıkılaşma.",
      img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=2070&auto=format&fit=crop",
      tag: "Odaklı"
    },
    {
      title: "Klinik Pilates",
      desc: "Esneklik ve merkez bölge güçlendirme.",
      img: "https://lh3.googleusercontent.com/d/177BntrnlQTMMkpvpxIT6ScWxXIJhK8Jy=s1024",
      tag: "Denge"
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
          {services.map((service, i) => {
            const CardContent = (
              <div className="group relative h-[400px] rounded-[3rem] overflow-hidden border border-white/5 cursor-pointer">
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
              </div>
            );

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {CardContent}
              </motion.div>
            );
          })}
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
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/before-after" element={<BeforeAfterPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/appointment" element={<AppointmentPage />} />
        <Route path="/contact" element={<ContactSection />} />
      </Routes>
      <EnhancedFooter />
    </div>
  );
}

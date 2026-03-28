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

// --- Components ---

const PilatesSlider = () => {
  const slides = [
    { img: "https://images.unsplash.com/photo-1518611012118-29a8d63ee0c2?q=80&w=2070&auto=format&fit=crop" },
    { img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop" },
    { img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1920&auto=format&fit=crop" }
  ];

  return (
    <div className="h-[50vh] md:h-[70vh] w-full relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        className="h-full w-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative h-full w-full">
              <img src={slide.img} className="h-full w-full object-cover grayscale" alt="Fitness" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/30" />
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
          <span className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">VIRAFIT</span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          <Link to="/" className="text-xs font-bold uppercase tracking-widest hover:text-brand-neon transition-colors">Ana Sayfa</Link>
          <Link to="/services" className="text-xs font-bold uppercase tracking-widest hover:text-brand-neon transition-colors">Hizmetlerimiz</Link>
          <Link to="/about" className="text-xs font-bold uppercase tracking-widest hover:text-brand-neon transition-colors">Hakkımızda</Link>
          <Link to="/contact" className="text-xs font-bold uppercase tracking-widest hover:text-brand-neon transition-colors">İletişim</Link>
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
              <Link to="/" className="text-sm font-bold uppercase tracking-widest" onClick={() => setIsMobileMenuOpen(false)}>Ana Sayfa</Link>
              <Link to="/services" className="text-sm font-bold uppercase tracking-widest" onClick={() => setIsMobileMenuOpen(false)}>Hizmetlerimiz</Link>
              <Link to="/about" className="text-sm font-bold uppercase tracking-widest" onClick={() => setIsMobileMenuOpen(false)}>Hakkımızda</Link>
              <Link to="/contact" className="text-sm font-bold uppercase tracking-widest" onClick={() => setIsMobileMenuOpen(false)}>İletişim</Link>
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
          className="w-full h-full object-cover grayscale brightness-50" 
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
            EMS, Biorezonans ve kişiye özel pilates ile kısa sürede gözle görülür değişim.
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
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-brand-neon font-black uppercase tracking-[0.3em] text-xs mb-4">Biz Kimiz?</p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-8 text-white">
              GELECEĞİN FİTNESS <br /> <span className="text-brand-pink">DENEYİMİ</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Virafit, geleneksel spor anlayışını modern teknolojiyle birleştiren, kadın odaklı bir fitness merkezidir. 
            </p>
            <p className="text-lg text-gray-400 mb-12 leading-relaxed">
              Amacımız, yoğun hayat temposu içinde kendine vakit ayırmakta zorlanan kadınlara, en kısa sürede en etkili sonuçları sunmaktır. EMS, Biorezonans ve Klinik Pilates disiplinlerini bir araya getirerek, sadece fiziksel değil, bütünsel bir iyilik hali hedefliyoruz.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[4rem] overflow-hidden border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                alt="About Virafit"
                referrerPolicy="no-referrer"
              />
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
      desc: "20 dakikada 4 saatlik antrenman etkisi.",
      img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop",
      tag: "Popüler"
    },
    {
      title: "Biorezonans",
      desc: "Vücut frekanslarını dengeleyerek iştah kontrolü.",
      img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1920&auto=format&fit=crop",
      tag: "Teknolojik"
    },
    {
      title: "Klinik Pilates",
      desc: "Esneklik ve merkez bölge güçlendirme.",
      img: "https://images.unsplash.com/photo-1518611012118-29a8d63ee0c2?q=80&w=2070&auto=format&fit=crop",
      tag: "Denge"
    },
    {
      title: "Bölgesel İncelme",
      desc: "Hedef odaklı cihazlarla yağ yakımı.",
      img: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=2070&auto=format&fit=crop",
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
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
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
    <section id="contact" className="bg-brand-dark pt-20">
      <PilatesSlider />
      
      {/* Map Section */}
      <div className="h-[400px] w-full bg-gray-900 overflow-hidden">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.963404456!2d29.0094!3d41.0763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab63f399e9571%3A0x2a3c2236a5d5624a!2sLevent%2C%20Be%C5%9Fikta%C5%9F%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1711620000000!5m2!1str!2str" 
          width="100%" 
          height="100%" 
          style={{ border: 0, filter: 'grayscale(1) invert(1) contrast(1.2)' }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Contact Form Section */}
      <div className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-brand-neon font-bold uppercase tracking-widest mb-4">Sorularınız mı var?</p>
            <h2 className="text-5xl font-black uppercase tracking-tighter">Bize Ulaşın</h2>
          </div>
          
          <Card className="p-10 border-white/10 bg-white/[0.03]">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Tam Adınız</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-brand-neon transition-all" placeholder="Ad Soyad" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Telefon Numarası</label>
                  <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-brand-neon transition-all" placeholder="(5XX) XXX XX XX" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">E-posta Adresi</label>
                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-brand-neon transition-all" placeholder="ornek@mail.com" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Mesajınız</label>
                <textarea rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-brand-neon transition-all resize-none" placeholder="Mesajınızı buraya yazın..."></textarea>
              </div>
              <Button className="w-full py-5 text-xl uppercase tracking-widest">Gönder</Button>
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
            <span className="text-2xl font-black tracking-tighter">VIRAFIT</span>
          </div>
          <p className="text-gray-400 leading-relaxed">
            Daha sağlıklı ve güçlü bir versiyonunuza giden yolculuk burada başlıyor.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-400">
              <MapPin size={18} className="text-brand-neon" />
              <span>Levent & Bağdat Caddesi, İstanbul</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <Phone size={18} className="text-brand-neon" />
              <span>(212) 555 0101</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <Mail size={18} className="text-brand-neon" />
              <span>info@virafit.com</span>
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

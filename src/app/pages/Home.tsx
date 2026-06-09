import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { Header } from '../components/Header';
import { mockCourses } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import {
  Code,
  FileSpreadsheet,
  Languages,
  ArrowRight,
  TrendingUp,
  Users,
  Award,
  Star,
  PlayCircle,
  ChevronRight,
  BookOpen,
  Zap,
  Globe,
  CheckCircle,
  Clock,
} from 'lucide-react';

/* ─── Floating badge component ─────────────────────────────────────── */
function FloatingBadge({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`floating-badge absolute bg-white rounded-2xl shadow-2xl p-4 flex items-center gap-3 ${className}`}>
      {children}
    </div>
  );
}

/* ─── Animated counter ──────────────────────────────────────────────── */
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      let start = 0;
      const step = target / 60;
      const timer = setInterval(() => {
        start += step;
        if (start >= target) { setCount(target); clearInterval(timer); }
        else setCount(Math.floor(start));
      }, 16);
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ─── Main component ────────────────────────────────────────────────── */
export function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const featuredCourses = mockCourses.filter(c => c.isFeatured);
  const categories = [
    { id: 'all',     name: 'Barchasi',    icon: BookOpen,        accent: '#6366F1' },
    { id: 'IT',      name: 'IT & Kod',    icon: Code,            accent: '#0EA5E9' },
    { id: 'Excel',   name: 'Excel',       icon: FileSpreadsheet, accent: '#10B981' },
    { id: 'English', name: 'Ingliz tili', icon: Languages,       accent: '#F59E0B' },
  ];

  const filteredCourses = selectedCategory === 'all'
    ? mockCourses
    : mockCourses.filter(c => c.category === selectedCategory);

  const stats = [
    { value: 5000, suffix: '+', label: "O'quvchilar",       icon: Users,     color: '#6366F1' },
    { value: 50,   suffix: '+', label: 'Kurslar',           icon: Award,     color: '#0EA5E9' },
    { value: 95,   suffix: '%', label: 'Qoniqish darajasi', icon: TrendingUp, color: '#10B981' },
  ];

  const benefits = [
    'Istalgan vaqt, istalgan joydan',
    'Sertifikat va diplom',
    'Jonli mentor yordami',
    "Amaliy loyihalar bilan o'rganish",
  ];

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'IT': return 'bg-blue-100 text-blue-700';
      case 'Excel': return 'bg-green-100 text-green-700';
      case 'English': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getLevelName = (level: string) => {
    switch(level) {
      case 'beginner': return 'Boshlang\'ich';
      case 'intermediate': return 'O\'rta';
      case 'pro': return 'Professional';
      default: return level;
    }
  };

  const getLevelBadge = (level: string) => {
    switch(level) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-blue-100 text-blue-700';
      case 'pro': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Hech qanday navigatsiya qilmaydigan funksiya
  const handleCardClick = () => {
    return;
  };

  return (
    <div className="home-root">
      <style>{`
        /* ── Reset & tokens ── */
        .home-root {
          --navy:    #0A0F1E;
          --navy2:   #111827;
          --electric:#2563EB;
          --sky:     #38BDF8;
          --gold:    #F59E0B;
          --mint:    #10B981;
          --purple:  #6366F1;
          --text:    #F8FAFC;
          --muted:   #94A3B8;
          --card-bg: #161D2E;
          --border:  rgba(255,255,255,0.08);
          min-height: 100vh;
          background: #F8FAFC;
          font-family: 'Inter', system-ui, sans-serif;
        }

        /* ── Hero ── */
        .hero {
          background: var(--navy);
          position: relative;
          overflow: hidden;
          padding: 0;
        }
        .hero-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 100px 24px 140px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }
        @media(max-width:768px){
          .hero-inner { grid-template-columns:1fr; padding:72px 20px 100px; }
          .hero-visual { display:none; }
        }
        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(245,158,11,0.12);
          border: 1px solid rgba(245,158,11,0.3);
          border-radius: 999px;
          padding: 6px 16px;
          color: var(--gold);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 24px;
        }
        .hero-title {
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 800;
          line-height: 1.1;
          color: var(--text);
          margin: 0 0 20px;
          letter-spacing: -0.02em;
        }
        .hero-title .accent {
          background: linear-gradient(135deg, var(--electric), var(--sky));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-sub {
          color: var(--muted);
          font-size: 1.1rem;
          line-height: 1.7;
          margin-bottom: 36px;
          max-width: 480px;
        }
        .hero-cta {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .btn-primary {
          background: var(--electric);
          color: #fff;
          border: none;
          border-radius: 12px;
          padding: 14px 28px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: transform .2s, box-shadow .2s, background .2s;
          text-decoration: none;
          box-shadow: 0 0 0 0 rgba(37,99,235,0.4);
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(37,99,235,0.4);
          background: #1D4ED8;
        }
        .btn-ghost {
          background: rgba(255,255,255,0.06);
          color: var(--text);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 14px 24px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: background .2s, transform .2s;
          text-decoration: none;
          backdrop-filter: blur(8px);
        }
        .btn-ghost:hover {
          background: rgba(255,255,255,0.12);
          transform: translateY(-2px);
        }
        .hero-benefits {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 32px;
        }
        .benefit-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--muted);
          font-size: 14px;
        }
        .benefit-item svg { color: var(--mint); flex-shrink: 0; }

        /* ── Hero visual side ── */
        .hero-visual {
          position: relative;
          height: 420px;
        }
        .hero-card-main {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 24px;
          width: 300px;
          box-shadow: 0 40px 80px rgba(0,0,0,0.5);
        }
        .progress-bar-wrap {
          height: 6px;
          background: rgba(255,255,255,0.1);
          border-radius: 3px;
          margin: 12px 0;
          overflow: hidden;
        }
        .progress-bar-fill {
          height: 100%;
          border-radius: 3px;
          background: linear-gradient(90deg, var(--electric), var(--sky));
          animation: fillBar 2s ease-out 0.5s both;
        }
        @keyframes fillBar { from{width:0} to{width:72%} }
        .floating-badge {
          position: absolute;
          background: #fff;
          border-radius: 14px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          animation: floatBob 3s ease-in-out infinite alternate;
          white-space: nowrap;
          font-size: 13px;
          font-weight: 600;
          color: #111;
        }
        .floating-badge.badge-1 { top: 30px; right: -20px; animation-delay: 0s; }
        .floating-badge.badge-2 { bottom: 40px; left: -30px; animation-delay: 1s; }
        @keyframes floatBob {
          from { transform: translateY(0px); }
          to   { transform: translateY(-10px); }
        }
        .badge-dot {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* ── Orb blobs ── */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .orb-1 { width:500px;height:500px;background:rgba(37,99,235,0.18);top:-100px;right:-100px; }
        .orb-2 { width:400px;height:400px;background:rgba(99,102,241,0.14);bottom:-100px;left:0; }
        .orb-3 { width:300px;height:300px;background:rgba(245,158,11,0.1);top:50%;right:30%; }
        .hero-grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
        }
        .hero-wave {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          line-height: 0;
        }

        /* ── Categories ── */
        .section-cats {
          background: #fff;
          padding: 80px 24px;
        }
        .section-title {
          font-size: 2rem;
          font-weight: 800;
          color: #0F172A;
          letter-spacing: -0.02em;
          margin: 0 0 8px;
        }
        .section-sub {
          color: #64748B;
          font-size: 1rem;
          margin: 0;
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 40px;
          flex-wrap: wrap;
          gap: 16px;
        }
        .cats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          max-width: 1100px;
          margin: 0 auto;
        }
        @media(max-width:768px){ .cats-grid { grid-template-columns:repeat(2,1fr); } }
        .cat-card {
          border: 2px solid transparent;
          border-radius: 20px;
          padding: 28px 20px;
          text-align: center;
          cursor: pointer;
          transition: all .25s ease;
          background: #F8FAFC;
          position: relative;
          overflow: hidden;
        }
        .cat-card::before {
          content:'';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          opacity: 0;
          transition: opacity .25s;
        }
        .cat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.1);
        }
        .cat-card.active {
          border-color: var(--active-color, var(--electric));
          background: var(--active-bg, #EFF6FF);
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(37,99,235,0.15);
        }
        .cat-icon-wrap {
          width: 64px;
          height: 64px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          transition: transform .25s;
        }
        .cat-card:hover .cat-icon-wrap,
        .cat-card.active .cat-icon-wrap { transform: scale(1.1) rotate(-3deg); }
        .cat-name {
          font-weight: 700;
          font-size: 15px;
          color: #0F172A;
          margin: 0 0 4px;
        }
        .cat-desc { font-size: 12px; color: #64748B; margin: 0; }

        /* ── Course grid sections ── */
        .section-courses {
          padding: 80px 24px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .courses-grid {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 24px;
        }
        @media(max-width:1024px){ .courses-grid { grid-template-columns:repeat(2,1fr); } }
        @media(max-width:640px) { .courses-grid { grid-template-columns:1fr; } }

        /* ── Stats ── */
        .section-stats {
          background: var(--navy);
          padding: 100px 24px;
          position: relative;
          overflow: hidden;
        }
        .stats-inner {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        .stats-headline {
          text-align: center;
          margin-bottom: 60px;
        }
        .stats-headline h2 {
          font-size: 2.4rem;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.02em;
          margin: 0 0 12px;
        }
        .stats-headline p { color: var(--muted); font-size: 1rem; margin: 0; }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 24px;
        }
        @media(max-width:768px){ .stats-grid { grid-template-columns:1fr; } }
        .stat-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 40px 32px;
          text-align: center;
          transition: transform .25s, box-shadow .25s;
        }
        .stat-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 60px rgba(0,0,0,0.4);
        }
        .stat-icon-wrap {
          width: 64px;
          height: 64px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
        }
        .stat-value {
          font-size: 3.5rem;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.03em;
          line-height: 1;
          margin-bottom: 8px;
        }
        .stat-label { color: var(--muted); font-size: 1rem; }

        /* ── CTA Banner ── */
        .section-cta {
          background: linear-gradient(135deg, #EFF6FF 0%, #F5F3FF 100%);
          padding: 100px 24px;
          text-align: center;
        }
        .cta-inner { max-width: 640px; margin: 0 auto; }
        .cta-inner h2 {
          font-size: 2.4rem;
          font-weight: 800;
          color: #0F172A;
          letter-spacing: -0.02em;
          margin: 0 0 16px;
        }
        .cta-inner p { color: #64748B; font-size: 1.1rem; margin: 0 0 36px; }

        /* ── Link-btn helpers ── */
        a.btn-primary, a.btn-ghost { text-decoration: none; }

        /* ── Card course hover lift ── */
        .course-lift {
          transition: transform .25s, box-shadow .25s;
        }
        .course-lift:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.12);
        }
        .link-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 600;
          color: var(--electric);
          text-decoration: none;
          transition: gap .2s;
        }
        .link-btn:hover { gap: 10px; }

        /* ── Divider wave ── */
        .wave-divider svg { display:block; }
      `}</style>

      <Header />

      {/* ─── HERO ─────────────────────────────────── */}
      <section className="hero">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="hero-grid-overlay" />

        <div className="hero-inner">
          {/* LEFT */}
          <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'translateY(20px)', transition: 'opacity .8s ease, transform .8s ease' }}>
            <div className="hero-eyebrow">
              <Star size={12} fill="currentColor" />
              O'zbekistoning №1 online ta'lim platformasi
            </div>

            <h1 className="hero-title">
              Kelajagingizni<br />
              <span className="accent">kod bilan</span><br />
              yarating
            </h1>

            <p className="hero-sub">
              Professional IT, Excel va ingliz tili kurslarimiz bilan yangi ko'nikmalar o'rganing. 
              5,000+ o'quvchi allaqachon boshlagan — siz ham qo'shiling.
            </p>

            <div className="hero-cta">
              <Link to="/courses" className="btn-primary">
                Kurslarni ko'rish <ChevronRight size={16} />
              </Link>
              <Link to="/register" className="btn-ghost">
                <PlayCircle size={16} />
                Bepul boshlash
              </Link>
            </div>

            <div className="hero-benefits">
              {benefits.map(b => (
                <div key={b} className="benefit-item">
                  <CheckCircle size={15} />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — visual card */}
          <div className="hero-visual" style={{ opacity: mounted ? 1 : 0, transition: 'opacity 1s ease 0.3s' }}>
            <div className="hero-card-main">
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
                <div style={{ width:40, height:40, borderRadius:12, background:'linear-gradient(135deg,#2563EB,#38BDF8)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Code size={20} color="#fff" />
                </div>
                <div>
                  <div style={{ fontWeight:700, fontSize:14, color:'#F8FAFC' }}>React.js Kursi</div>
                  <div style={{ fontSize:12, color:'#64748B' }}>12 ta dars • 4 soat</div>
                </div>
              </div>
              <div style={{ fontSize:12, color:'#94A3B8', marginBottom:6 }}>Jarayon: 72%</div>
              <div className="progress-bar-wrap">
                <div className="progress-bar-fill" style={{ width:'72%' }} />
              </div>
              <div style={{ display:'flex', gap:8, marginTop:16, flexWrap:'wrap' }}>
                {['useState','useEffect','Props'].map(tag => (
                  <span key={tag} style={{ fontSize:11, fontWeight:600, background:'rgba(37,99,235,0.2)', color:'#38BDF8', borderRadius:6, padding:'3px 10px' }}>{tag}</span>
                ))}
              </div>
            </div>

            <div className="floating-badge badge-1">
              <div className="badge-dot" style={{ background:'#EFF6FF' }}>
                <Users size={18} color="#2563EB" />
              </div>
              <div>
                <div style={{ fontWeight:700, fontSize:13 }}>+24 o'quvchi</div>
                <div style={{ fontSize:11, color:'#64748B', fontWeight:400 }}>bugun qo'shildi</div>
              </div>
            </div>

            <div className="floating-badge badge-2">
              <div className="badge-dot" style={{ background:'#FFFBEB' }}>
                <Star size={18} color="#F59E0B" fill="#F59E0B" />
              </div>
              <div>
                <div style={{ fontWeight:700, fontSize:13 }}>4.9 / 5.0</div>
                <div style={{ fontSize:11, color:'#64748B', fontWeight:400 }}>o'rtacha baho</div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-wave">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width:'100%', height:60 }}>
            <path d="M0 60V30C180 0 360 0 540 20C720 40 900 60 1080 50C1260 40 1380 20 1440 10V60H0Z" fill="#ffffff"/>
          </svg>
        </div>
      </section>

      {/* ─── CATEGORIES ──────────────────────────── */}
      <section className="section-cats">
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div className="section-header">
            <div>
              <h2 className="section-title">Yo'nalishni tanlang</h2>
              <p className="section-sub">Qiziqishingizga mos kurslarni toping</p>
            </div>
          </div>

          <div className="cats-grid">
            {categories.map(cat => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <div
                  key={cat.id}
                  className={`cat-card${isActive ? ' active' : ''}`}
                  style={isActive ? { '--active-color': cat.accent, '--active-bg': cat.accent + '14' } as React.CSSProperties : {}}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <div
                    className="cat-icon-wrap"
                    style={{ background: isActive ? cat.accent : cat.accent + '18' }}
                  >
                    <Icon size={28} color={isActive ? '#fff' : cat.accent} />
                  </div>
                  <p className="cat-name">{cat.name}</p>
                  <p className="cat-desc">
                    {cat.id === 'all'     ? 'Barcha kurslar' :
                     cat.id === 'IT'      ? 'Dasturlash va texnologiya' :
                     cat.id === 'Excel'   ? "Ma'lumotlar tahlili" :
                                            "Xalqaro muloqot tili"}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── FEATURED COURSES - "Tez orada" bilan ─────────────────────── */}
      <section style={{ background:'#F8FAFC', padding:'0 0 80px' }}>
        <div className="section-courses">
          <div className="section-header">
            <div>
              <h2 className="section-title">
                {selectedCategory === 'all'
                  ? 'Mashhur kurslar'
                  : `${categories.find(c => c.id === selectedCategory)?.name} kurslari`}
              </h2>
              <p className="section-sub">
                {selectedCategory === 'all'
                  ? 'Eng yuqori baho va talabga ega kurslar'
                  : "Siz uchun maxsus tanlangan yo'nalish kurslari"}
              </p>
            </div>
            <Link to="/courses" className="link-btn">
              Barchasini ko'rish <ArrowRight size={15} />
            </Link>
          </div>

          <div className="courses-grid">
            {(selectedCategory === 'all' ? featuredCourses : filteredCourses).map((course, idx) => (
              <div
                key={course.id}
                onClick={handleCardClick}
                className="course-lift cursor-default"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'none' : 'translateY(24px)',
                  transition: `opacity .5s ease ${idx * 80}ms, transform .5s ease ${idx * 80}ms`,
                }}
              >
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                  <div className="relative overflow-hidden h-48">
                    <img 
                      src={course.image} 
                      alt={course.titleUz}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getCategoryColor(course.category)}`}>
                        {course.category}
                      </span>
                    </div>
                    
                    {/* Level Badge */}
                    <div className="absolute bottom-3 left-3">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getLevelBadge(course.level)}`}>
                        {getLevelName(course.level)}
                      </span>
                    </div>

                    {/* COMING SOON OVERLAY */}
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                      <div className="text-center">
                        <div className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 animate-pulse" />
                          Tez orada
                        </div>
                        <p className="text-white text-xs">Darslar tayyorlanmoqda</p>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-5">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
                      {course.titleUz}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                      {course.descriptionUz}
                    </p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                          <span>{course.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          <span>{course.students.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{course.duration}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div>
                        <span className="font-bold text-lg text-gray-900">
                          {course.price.toLocaleString()} so'm
                        </span>
                        <span className="text-xs text-yellow-600 ml-2">(Tez orada)</span>
                      </div>
                      <Button size="sm" className="bg-gray-900 hover:bg-gray-800 opacity-50 cursor-default" onClick={(e) => e.preventDefault()}>
                        Ko'rish
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ────────────────────────────────── */}
      <section className="section-stats">
        <div className="orb orb-1" style={{ opacity:0.6 }} />
        <div className="orb orb-2" style={{ opacity:0.5 }} />
        <div className="stats-inner">
          <div className="stats-headline">
            <h2>Raqamlar bizni tasdiqlaydi</h2>
            <p>Minglab o'quvchilar va o'qituvchilarning ishonchi</p>
          </div>
          <div className="stats-grid">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="stat-card">
                  <div className="stat-icon-wrap" style={{ background: s.color + '20' }}>
                    <Icon size={28} color={s.color} />
                  </div>
                  <div className="stat-value" style={{ color: s.color }}>
                    <Counter target={s.value} suffix={s.suffix} />
                  </div>
                  <div className="stat-label">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ───────────────────────────── */}
      <section className="section-cta">
        <div className="cta-inner">
          <div style={{
            display:'inline-flex', alignItems:'center', gap:8,
            background:'#EFF6FF', border:'1px solid #BFDBFE',
            borderRadius:999, padding:'6px 16px',
            color:'#2563EB', fontSize:13, fontWeight:600,
            marginBottom:20
          }}>
            <Zap size={13} />
            Bugun boshlang
          </div>
          <h2>Karyerangizni<br />keyingi bosqichga olib chiqing</h2>
          <p>
            Birinchi darsni bepul ko'ring. Ro'yxatdan o'tish 30 soniya oladi.
          </p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <Link to="/register" className="btn-primary" style={{ fontSize:16, padding:'16px 32px' }}>
              Bepul boshlash <ChevronRight size={18} />
            </Link>
            <Link to="/courses" className="btn-ghost" style={{ color:'#0F172A', borderColor:'#CBD5E1', background:'#fff', fontSize:16, padding:'16px 24px' }}>
              <Globe size={16} color="#2563EB" />
              Kurslarni ko'rish
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
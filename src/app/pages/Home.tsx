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
  Menu,
  X,
} from 'lucide-react';

/* ─── Floating badge component ─────────────────────────────────────── */
function FloatingBadge({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`floating-badge absolute bg-white rounded-2xl shadow-2xl p-3 flex items-center gap-2 ${className}`}>
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
      const step = target / 50;
      const timer = setInterval(() => {
        start += step;
        if (start >= target) { setCount(target); clearInterval(timer); }
        else setCount(Math.floor(start));
      }, 20);
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
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
          padding: 80px 20px 100px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          align-items: center;
        }
        
        /* Mobile hero styles */
        @media(max-width: 768px) {
          .hero-inner { 
            grid-template-columns: 1fr; 
            padding: 60px 16px 80px;
            gap: 40px;
          }
          .hero-visual { 
            display: block;
            min-height: 380px;
          }
          .hero-title {
            font-size: clamp(28px, 8vw, 44px) !important;
            line-height: 1.2 !important;
          }
          .hero-sub {
            font-size: 16px !important;
            line-height: 1.5 !important;
          }
          .hero-cta {
            flex-direction: column;
            gap: 12px !important;
          }
          .hero-cta .btn-primary,
          .hero-cta .btn-ghost {
            width: 100%;
            justify-content: center;
            padding: 14px 20px !important;
          }
          .hero-benefits {
            margin-top: 24px !important;
          }
          .benefit-item {
            font-size: 13px !important;
          }
        }

        @media(max-width: 480px) {
          .hero-inner { padding: 50px 16px 70px; }
        }

        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(245,158,11,0.12);
          border: 1px solid rgba(245,158,11,0.3);
          border-radius: 999px;
          padding: 6px 14px;
          color: var(--gold);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        
        @media(max-width: 768px) {
          .hero-eyebrow {
            font-size: 11px;
            padding: 5px 12px;
          }
        }
        
        .hero-title {
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 800;
          line-height: 1.1;
          color: var(--text);
          margin: 0 0 16px;
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
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 28px;
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
          padding: 12px 24px;
          font-size: 14px;
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
          box-shadow: 0 8px 24px rgba(37,99,235,0.3);
          background: #1D4ED8;
        }
        .btn-ghost {
          background: rgba(255,255,255,0.06);
          color: var(--text);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 12px 20px;
          font-size: 14px;
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
          gap: 8px;
          margin-top: 28px;
        }
        .benefit-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--muted);
          font-size: 13px;
        }
        .benefit-item svg { 
          color: var(--mint); 
          flex-shrink: 0;
          width: 14px;
          height: 14px;
        }

        /* ── Hero visual side ── */
        .hero-visual {
          position: relative;
          height: auto;
          min-height: 380px;
        }
        
        @media(max-width: 768px) {
          .hero-visual {
            min-height: 340px;
          }
          .hero-card-main {
            width: 85% !important;
            max-width: 280px;
            padding: 16px !important;
          }
          .floating-badge {
            padding: 8px 12px !important;
            font-size: 11px !important;
          }
          .floating-badge .badge-dot {
            width: 28px !important;
            height: 28px !important;
          }
          .floating-badge .badge-dot svg {
            width: 14px !important;
            height: 14px !important;
          }
          .badge-1 { top: 10px !important; right: -5px !important; }
          .badge-2 { bottom: 20px !important; left: -10px !important; }
        }
        
        @media(max-width: 480px) {
          .hero-visual { min-height: 300px; }
          .hero-card-main { width: 90% !important; padding: 14px !important; }
          .badge-1 { top: 0 !important; right: -8px !important; }
          .badge-2 { bottom: 10px !important; left: -15px !important; }
        }
        
        .hero-card-main {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 20px;
          width: 280px;
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
          border-radius: 12px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.2);
          animation: floatBob 3s ease-in-out infinite alternate;
          white-space: nowrap;
          font-size: 12px;
          font-weight: 600;
          color: #111;
        }
        .floating-badge.badge-1 { top: 20px; right: -15px; animation-delay: 0s; }
        .floating-badge.badge-2 { bottom: 30px; left: -25px; animation-delay: 1s; }
        @keyframes floatBob {
          from { transform: translateY(0px); }
          to   { transform: translateY(-8px); }
        }
        .badge-dot {
          width: 32px;
          height: 32px;
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
        .orb-1 { width:300px;height:300px;background:rgba(37,99,235,0.18);top:-100px;right:-100px; }
        .orb-2 { width:250px;height:250px;background:rgba(99,102,241,0.14);bottom:-80px;left:-50px; }
        .orb-3 { width:200px;height:200px;background:rgba(245,158,11,0.1);top:50%;right:20%; }
        
        @media(max-width: 768px) {
          .orb-1 { width:200px;height:200px; }
          .orb-2 { width:180px;height:180px; }
          .orb-3 { width:150px;height:150px; }
        }
        
        .hero-grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
        }
        .hero-wave {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          line-height: 0;
        }
        
        @media(max-width: 768px) {
          .hero-wave svg {
            height: 30px !important;
          }
        }

        /* ── Categories ── */
        .section-cats {
          background: #fff;
          padding: 60px 16px;
        }
        
        @media(max-width: 768px) {
          .section-cats {
            padding: 40px 16px;
          }
          .section-title {
            font-size: 24px !important;
          }
          .section-sub {
            font-size: 14px !important;
          }
        }
        
        .section-title {
          font-size: 28px;
          font-weight: 800;
          color: #0F172A;
          letter-spacing: -0.02em;
          margin: 0 0 8px;
        }
        .section-sub {
          color: #64748B;
          font-size: 14px;
          margin: 0;
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 32px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .cats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          max-width: 1100px;
          margin: 0 auto;
        }
        
        @media(max-width: 768px) {
          .cats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          .cat-card {
            padding: 20px 12px !important;
          }
          .cat-icon-wrap {
            width: 48px !important;
            height: 48px !important;
          }
          .cat-icon-wrap svg {
            width: 22px !important;
            height: 22px !important;
          }
          .cat-name {
            font-size: 13px !important;
          }
          .cat-desc {
            font-size: 10px !important;
          }
        }
        
        @media(max-width: 480px) {
          .cats-grid {
            gap: 8px;
          }
          .cat-card {
            padding: 16px 8px !important;
          }
          .cat-icon-wrap {
            width: 44px !important;
            height: 44px !important;
          }
          .cat-name {
            font-size: 12px !important;
          }
        }
        
        .cat-card {
          border: 2px solid transparent;
          border-radius: 16px;
          padding: 24px 16px;
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
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }
        .cat-card.active {
          border-color: var(--active-color, var(--electric));
          background: var(--active-bg, #EFF6FF);
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(37,99,235,0.12);
        }
        .cat-icon-wrap {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px;
          transition: transform .25s;
        }
        .cat-card:hover .cat-icon-wrap,
        .cat-card.active .cat-icon-wrap { transform: scale(1.05) rotate(-2deg); }
        .cat-name {
          font-weight: 700;
          font-size: 14px;
          color: #0F172A;
          margin: 0 0 4px;
        }
        .cat-desc { 
          font-size: 11px; 
          color: #64748B; 
          margin: 0;
          line-height: 1.3;
        }

        /* ── Course grid sections ── */
        .section-courses {
          padding: 0 16px 60px;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        @media(max-width: 768px) {
          .section-courses {
            padding: 0 16px 40px;
          }
        }
        
        .courses-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        
        @media(max-width: 1024px) {
          .courses-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }
        
        @media(max-width: 640px) {
          .courses-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .course-card-image {
            height: 180px !important;
          }
          .card-content {
            padding: 16px !important;
          }
          .course-title {
            font-size: 16px !important;
          }
          .course-description {
            font-size: 13px !important;
          }
        }
        
        /* ── Stats ── */
        .section-stats {
          background: var(--navy);
          padding: 60px 16px;
          position: relative;
          overflow: hidden;
        }
        
        @media(max-width: 768px) {
          .section-stats {
            padding: 50px 16px;
          }
          .stats-headline h2 {
            font-size: 24px !important;
          }
          .stats-headline p {
            font-size: 14px !important;
          }
          .stat-card {
            padding: 28px 20px !important;
          }
          .stat-value {
            font-size: 2.5rem !important;
          }
          .stat-icon-wrap {
            width: 50px !important;
            height: 50px !important;
          }
          .stat-icon-wrap svg {
            width: 24px !important;
            height: 24px !important;
          }
        }
        
        .stats-inner {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        .stats-headline {
          text-align: center;
          margin-bottom: 48px;
        }
        .stats-headline h2 {
          font-size: 32px;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.02em;
          margin: 0 0 12px;
        }
        .stats-headline p { color: var(--muted); font-size: 14px; margin: 0; }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        
        @media(max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
        
        .stat-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 32px 24px;
          text-align: center;
          transition: transform .25s, box-shadow .25s;
        }
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        .stat-icon-wrap {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }
        .stat-value {
          font-size: 2.8rem;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.03em;
          line-height: 1;
          margin-bottom: 8px;
        }
        .stat-label { color: var(--muted); font-size: 14px; }

        /* ── CTA Banner ── */
        .section-cta {
          background: linear-gradient(135deg, #EFF6FF 0%, #F5F3FF 100%);
          padding: 60px 20px;
          text-align: center;
        }
        
        @media(max-width: 768px) {
          .section-cta {
            padding: 50px 20px;
          }
          .cta-inner h2 {
            font-size: 24px !important;
            line-height: 1.3 !important;
          }
          .cta-inner p {
            font-size: 15px !important;
            margin-bottom: 28px !important;
          }
          .cta-inner .btn-primary,
          .cta-inner .btn-ghost {
            width: 100%;
            justify-content: center;
          }
        }
        
        .cta-inner { 
          max-width: 640px; 
          margin: 0 auto; 
        }
        .cta-inner h2 {
          font-size: 32px;
          font-weight: 800;
          color: #0F172A;
          letter-spacing: -0.02em;
          margin: 0 0 16px;
        }
        .cta-inner p { 
          color: #64748B; 
          font-size: 16px; 
          margin: 0 0 32px; 
        }

        /* ── Link-btn helpers ── */
        a.btn-primary, a.btn-ghost { 
          text-decoration: none; 
        }

        /* ── Card course hover lift ── */
        .course-lift {
          transition: transform .25s, box-shadow .25s;
          cursor: default;
        }
        .course-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.1);
        }
        
        @media(max-width: 768px) {
          .course-lift:hover {
            transform: translateY(-2px);
          }
        }
        
        .link-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          color: var(--electric);
          text-decoration: none;
          transition: gap .2s;
        }
        .link-btn:hover { gap: 10px; }

        /* ── Divider wave ── */
        .wave-divider svg { display:block; }
        
        /* Additional mobile optimizations */
        @media(max-width: 480px) {
          .badge-dot {
            width: 28px !important;
            height: 28px !important;
          }
          .hero-card-main div[style*="font-size: 14px"] {
            font-size: 12px !important;
          }
        }
        
        /* Touch-friendly buttons */
        @media (hover: none) and (pointer: coarse) {
          .btn-primary, .btn-ghost, .cat-card {
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
          }
          .btn-primary:active, .btn-ghost:active {
            transform: scale(0.98);
          }
        }
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
          <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'translateY(20px)', transition: 'opacity .6s ease, transform .6s ease' }}>
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
                  <CheckCircle size={14} />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — visual card */}
          <div className="hero-visual" style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.8s ease 0.3s' }}>
            <div className="hero-card-main">
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
                <div style={{ width:36, height:36, borderRadius:10, background:'linear-gradient(135deg,#2563EB,#38BDF8)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Code size={18} color="#fff" />
                </div>
                <div>
                  <div style={{ fontWeight:700, fontSize:13, color:'#F8FAFC' }}>React.js Kursi</div>
                  <div style={{ fontSize:11, color:'#64748B' }}>12 ta dars • 4 soat</div>
                </div>
              </div>
              <div style={{ fontSize:11, color:'#94A3B8', marginBottom:4 }}>Jarayon: 72%</div>
              <div className="progress-bar-wrap">
                <div className="progress-bar-fill" style={{ width:'72%' }} />
              </div>
              <div style={{ display:'flex', gap:6, marginTop:12, flexWrap:'wrap' }}>
                {['useState','useEffect','Props'].map(tag => (
                  <span key={tag} style={{ fontSize:10, fontWeight:600, background:'rgba(37,99,235,0.2)', color:'#38BDF8', borderRadius:5, padding:'3px 8px' }}>{tag}</span>
                ))}
              </div>
            </div>

            <div className="floating-badge badge-1">
              <div className="badge-dot" style={{ background:'#EFF6FF' }}>
                <Users size={16} color="#2563EB" />
              </div>
              <div>
                <div style={{ fontWeight:700, fontSize:12 }}>+24 o'quvchi</div>
                <div style={{ fontSize:10, color:'#64748B', fontWeight:400 }}>bugun qo'shildi</div>
              </div>
            </div>

            <div className="floating-badge badge-2">
              <div className="badge-dot" style={{ background:'#FFFBEB' }}>
                <Star size={16} color="#F59E0B" fill="#F59E0B" />
              </div>
              <div>
                <div style={{ fontWeight:700, fontSize:12 }}>4.9 / 5.0</div>
                <div style={{ fontSize:10, color:'#64748B', fontWeight:400 }}>o'rtacha baho</div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-wave">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width:'100%', height:50 }}>
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
                    <Icon size={24} color={isActive ? '#fff' : cat.accent} />
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
      <section style={{ background:'#F8FAFC', padding:'0 0 60px' }}>
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
              Barchasini ko'rish <ArrowRight size={14} />
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
                  transform: mounted ? 'none' : 'translateY(20px)',
                  transition: `opacity .5s ease ${idx * 80}ms, transform .5s ease ${idx * 80}ms`,
                }}
              >
                <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 h-full">
                  <div className="relative overflow-hidden course-card-image" style={{ height: '200px' }}>
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
                      <div className="text-center px-3">
                        <div className="bg-yellow-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 mb-2">
                          <Clock className="w-3.5 h-3.5 animate-pulse" />
                          Tez orada
                        </div>
                        <p className="text-white text-xs">Darslar tayyorlanmoqda</p>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-4 card-content">
                    <h3 className="font-bold text-base text-gray-900 mb-2 line-clamp-1 course-title">
                      {course.titleUz}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-3 course-description">
                      {course.descriptionUz}
                    </p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{course.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{course.students.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{course.duration}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div>
                        <span className="font-bold text-base text-gray-900">
                          {course.price.toLocaleString()} so'm
                        </span>
                        <span className="text-xs text-yellow-600 ml-1">(Tez orada)</span>
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
        <div className="orb orb-1" style={{ opacity:0.5 }} />
        <div className="orb orb-2" style={{ opacity:0.4 }} />
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
                    <Icon size={26} color={s.color} />
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
            display:'inline-flex', alignItems:'center', gap:6,
            background:'#EFF6FF', border:'1px solid #BFDBFE',
            borderRadius:999, padding:'5px 14px',
            color:'#2563EB', fontSize:12, fontWeight:600,
            marginBottom:16
          }}>
            <Zap size={12} />
            Bugun boshlang
          </div>
          <h2>Karyerangizni<br />keyingi bosqichga olib chiqing</h2>
          <p>
            Birinchi darsni bepul ko'ring. Ro'yxatdan o'tish 30 soniya oladi.
          </p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <Link to="/register" className="btn-primary" style={{ fontSize:14, padding:'12px 24px' }}>
              Bepul boshlash <ChevronRight size={16} />
            </Link>
            <Link to="/courses" className="btn-ghost" style={{ color:'#0F172A', borderColor:'#CBD5E1', background:'#fff', fontSize:14, padding:'12px 20px' }}>
              <Globe size={14} color="#2563EB" />
              Kurslarni ko'rish
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
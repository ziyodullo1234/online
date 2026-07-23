import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { Header } from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { mockCourses } from '../data/mockData';
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

/* ─── Terminal boot / welcome sequence ──────────────────────────────── */
function TerminalBoot({ userName, onDone }: { userName?: string; onDone: () => void }) {
  const lines = [
    'erkinov@platform:~$ init --load-modules',
    'Modullar yuklanmoqda ████████████████ 100%',
    'erkinov@platform:~$ auth --verify-session',
    userName ? `✓ Xush kelibsiz, ${userName}!` : "✓ Xush kelibsiz, mehmon!",
    'erkinov@platform:~$ open ./home',
  ];
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const skippedRef = useRef(false);

  useEffect(() => {
    if (lineIdx >= lines.length) {
      const t = setTimeout(onDone, 550);
      return () => clearTimeout(t);
    }
    const current = lines[lineIdx];
    if (charIdx <= current.length) {
      const t = setTimeout(() => {
        setDisplayed((prev) => {
          const copy = [...prev];
          copy[lineIdx] = current.slice(0, charIdx);
          return copy;
        });
        setCharIdx((c) => c + 1);
      }, current.includes('█') ? 6 : 16);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setLineIdx((i) => i + 1);
        setCharIdx(0);
      }, 260);
      return () => clearTimeout(t);
    }
  }, [charIdx, lineIdx]); // eslint-disable-line react-hooks/exhaustive-deps

  const skip = () => {
    if (skippedRef.current) return;
    skippedRef.current = true;
    setDisplayed(lines);
    setLineIdx(lines.length);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ') skip();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="terminal-window" onClick={skip} role="button" aria-label="O'tkazib yuborish">
      <div className="terminal-titlebar">
        <span className="t-dot t-red" />
        <span className="t-dot t-yellow" />
        <span className="t-dot t-green" />
        <span className="terminal-path">erkinov — zsh</span>
      </div>
      <div className="terminal-body">
        {displayed.map((l, i) => (
          <div key={i} className={`terminal-line ${l.startsWith('✓') ? 'ok' : ''}`}>
            {l}
          </div>
        ))}
        <span className="terminal-cursor" />
      </div>
      <div className="terminal-hint">bosing yoki Enter — o'tkazib yuborish</div>
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
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [mounted, setMounted] = useState(false);

  const [showIntro, setShowIntro] = useState(() => {
    try {
      return typeof window !== 'undefined' && !sessionStorage.getItem('erkinov_intro_shown');
    } catch {
      return true;
    }
  });
  const [introFading, setIntroFading] = useState(false);

  const handleIntroDone = () => {
    setIntroFading(true);
    setTimeout(() => {
      setShowIntro(false);
      try { sessionStorage.setItem('erkinov_intro_shown', '1'); } catch {}
    }, 420);
  };

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const featuredCourses = mockCourses.filter(c => c.isFeatured);
  const categories = [
    { id: 'all',     name: 'Barchasi',    icon: BookOpen,        accent: '#6366F1', desc: 'Barcha kurslar' },
    { id: 'IT',      name: 'IT & Kod',    icon: Code,            accent: '#0EA5E9', desc: 'Dasturlash va texnologiya' },
    { id: 'Excel',   name: 'Excel',       icon: FileSpreadsheet, accent: '#10B981', desc: "Ma'lumotlar tahlili" },
    { id: 'English', name: 'Ingliz tili', icon: Languages,       accent: '#F59E0B', desc: 'Xalqaro muloqot tili' },
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

  return (
    <div className="home-root">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .home-root {
          --navy: #0A0F1E;
          --electric: #2563EB;
          --sky: #38BDF8;
          --gold: #F59E0B;
          --mint: #10B981;
          --purple: #6366F1;
          --text: #F8FAFC;
          --muted: #94A3B8;
          --card-bg: #161D2E;
          background: #F8FAFC;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', system-ui, sans-serif;
          width: 100%;
          overflow-x: hidden;
        }

        /* ========== TERMINAL BOOT ========== */
        .terminal-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: radial-gradient(ellipse at center, #0d1424 0%, #05070d 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          transition: opacity 0.4s ease;
        }
        .terminal-overlay.fade-out {
          opacity: 0;
          pointer-events: none;
        }
        .terminal-window {
          width: min(560px, 100%);
          background: #0b1120;
          border: 1px solid rgba(56, 189, 248, 0.25);
          border-radius: 14px;
          box-shadow: 0 0 0 1px rgba(255,255,255,0.03), 0 30px 80px -20px rgba(37, 99, 235, 0.35);
          overflow: hidden;
          cursor: pointer;
          animation: bootIn 0.4s ease;
        }
        @keyframes bootIn {
          from { opacity: 0; transform: scale(0.97) translateY(6px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .terminal-titlebar {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 10px 14px;
          background: #10182c;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .t-dot { width: 10px; height: 10px; border-radius: 50%; }
        .t-red { background: #FF5F57; }
        .t-yellow { background: #FEBC2E; }
        .t-green { background: #28C840; }
        .terminal-path {
          margin-left: 8px;
          font-size: 11px;
          color: #64748B;
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        }
        .terminal-body {
          padding: 20px 18px 16px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 13px;
          line-height: 1.9;
          min-height: 160px;
        }
        @media (max-width: 480px) {
          .terminal-body { font-size: 11.5px; min-height: 140px; line-height: 1.8; }
        }
        .terminal-line {
          color: #94A3B8;
          white-space: pre-wrap;
          word-break: break-word;
        }
        .terminal-line.ok {
          color: #38BDF8;
          font-weight: 600;
        }
        .terminal-cursor {
          display: inline-block;
          width: 7px;
          height: 14px;
          background: #38BDF8;
          animation: blink 0.9s step-end infinite;
          vertical-align: text-bottom;
        }
        @keyframes blink { 50% { opacity: 0; } }
        .terminal-hint {
          text-align: center;
          font-size: 10px;
          color: #475569;
          padding: 0 14px 14px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        }

        /* Container */
        .container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 16px;
        }

        /* ========== HERO SECTION ========== */
        .hero {
          background: var(--navy);
          position: relative;
          overflow: hidden;
          width: 100%;
        }

        .hero-content {
          padding: 80px 0 60px;
          position: relative;
          z-index: 2;
        }

        @media (max-width: 768px) {
          .hero-content {
            padding: 44px 0 40px;
          }
        }

        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(245, 158, 11, 0.12);
          border: 1px solid rgba(245, 158, 11, 0.3);
          border-radius: 100px;
          padding: 6px 14px;
          color: var(--gold);
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: 20px;
          max-width: 100%;
        }
        @media (max-width: 480px) {
          .hero-eyebrow {
            font-size: 10px;
            padding: 6px 10px;
            white-space: normal;
            line-height: 1.4;
          }
        }

        .hero-title {
          font-size: 36px;
          font-weight: 800;
          line-height: 1.2;
          color: var(--text);
          margin-bottom: 16px;
          letter-spacing: -0.02em;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 32px;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 26px;
          }
        }

        .hero-title .accent {
          background: linear-gradient(135deg, var(--electric), var(--sky));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-sub {
          color: var(--muted);
          font-size: 16px;
          line-height: 1.5;
          margin-bottom: 28px;
          max-width: 480px;
        }

        @media (max-width: 768px) {
          .hero-sub {
            font-size: 15px;
          }
        }

        .hero-buttons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 28px;
        }

        @media (max-width: 480px) {
          .hero-buttons {
            flex-direction: column;
          }
          .hero-buttons .btn {
            width: 100%;
            justify-content: center;
          }
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
          cursor: pointer;
          border: none;
        }

        .btn-primary {
          background: var(--electric);
          color: white;
          box-shadow: 0 8px 20px rgba(37, 99, 235, 0.35);
        }

        .btn-primary:hover {
          background: #1D4ED8;
          box-shadow: 0 10px 24px rgba(37, 99, 235, 0.45);
          transform: translateY(-1px);
        }

        .btn-primary:active {
          transform: scale(0.97);
          background: #1D4ED8;
        }

        .btn-ghost {
          background: rgba(255, 255, 255, 0.06);
          color: var(--text);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .btn-ghost:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .btn-ghost:active {
          transform: scale(0.97);
        }

        .benefits-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
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
        }

        /* Hero Visual Card */
        .hero-visual-card {
          background: var(--card-bg);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 24px;
          margin-top: 40px;
          box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.5);
        }

        @media (min-width: 768px) {
          .hero-visual-card {
            margin-top: 0;
          }
        }

        .progress-bar {
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          margin: 12px 0;
          overflow: hidden;
        }

        .progress-fill {
          width: 72%;
          height: 100%;
          background: linear-gradient(90deg, var(--electric), var(--sky));
          border-radius: 3px;
          animation: fillBar 1.5s ease-out;
        }

        @keyframes fillBar {
          from { width: 0; }
          to { width: 72%; }
        }

        .tech-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 16px;
        }

        .tech-tag {
          font-size: 10px;
          font-weight: 600;
          background: rgba(37, 99, 235, 0.2);
          color: #38BDF8;
          border-radius: 6px;
          padding: 4px 10px;
        }

        .floating-badge {
          background: white;
          border-radius: 12px;
          padding: 10px 14px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        /* ========== CATEGORIES ========== */
        .categories-section {
          background: white;
          padding: 60px 16px;
        }

        @media (max-width: 768px) {
          .categories-section {
            padding: 44px 16px;
          }
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 28px;
        }

        .section-title {
          font-size: 28px;
          font-weight: 800;
          color: #0F172A;
          letter-spacing: -0.02em;
          margin-bottom: 8px;
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 24px;
          }
        }

        .section-sub {
          color: #64748B;
          font-size: 14px;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }

        @media (max-width: 640px) {
          .categories-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }

        .category-card {
          background: #F8FAFC;
          border: 2px solid transparent;
          border-radius: 16px;
          padding: 22px 12px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        @media (max-width: 480px) {
          .category-card {
            padding: 16px 8px;
          }
        }

        .category-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px -12px rgba(15, 23, 42, 0.15);
        }

        .category-card.active {
          border-color: var(--active-color);
          background: var(--active-bg);
          transform: translateY(-2px);
          box-shadow: 0 12px 24px -12px rgba(15, 23, 42, 0.15);
        }

        .category-card:active {
          transform: scale(0.97);
        }

        .category-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px;
          transition: transform 0.2s;
        }

        @media (max-width: 480px) {
          .category-icon {
            width: 44px;
            height: 44px;
          }
          .category-icon svg {
            width: 22px;
            height: 22px;
          }
        }

        .category-card.active .category-icon {
          transform: scale(1.05);
        }

        .category-name {
          font-weight: 700;
          font-size: 14px;
          color: #0F172A;
          margin-bottom: 4px;
        }

        @media (max-width: 480px) {
          .category-name {
            font-size: 13px;
          }
        }

        .category-desc {
          font-size: 10px;
          color: #64748B;
        }

        @media (max-width: 480px) {
          .category-desc {
            font-size: 9px;
          }
        }

        /* ========== COURSES GRID ========== */
        .courses-section {
          background: #F8FAFC;
          padding: 0 16px 70px;
        }

        @media (max-width: 768px) {
          .courses-section {
            padding: 0 16px 44px;
          }
        }

        .courses-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        @media (max-width: 1024px) {
          .courses-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .courses-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        .course-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid #E2E8F0;
          transition: all 0.25s ease;
        }

        .course-card:hover {
          box-shadow: 0 20px 40px -16px rgba(15, 23, 42, 0.18);
          transform: translateY(-3px);
          border-color: #CBD5E1;
        }

        .course-card:active {
          transform: scale(0.98);
        }

        .course-image {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        @media (max-width: 640px) {
          .course-image {
            height: 180px;
          }
        }

        .course-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .course-card:hover .course-image img {
          transform: scale(1.05);
        }

        .course-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 20px;
        }

        .course-level {
          position: absolute;
          bottom: 12px;
          left: 12px;
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 20px;
        }

        .coming-soon-overlay {
          position: absolute;
          inset: 0;
          background: rgba(10, 15, 30, 0.7);
          backdrop-filter: blur(1px);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .coming-soon-badge {
          background: #F59E0B;
          color: white;
          padding: 8px 16px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 8px;
        }

        .course-content {
          padding: 18px 16px;
        }

        .course-title {
          font-size: 16px;
          font-weight: 700;
          color: #0F172A;
          margin-bottom: 8px;
        }

        .course-desc {
          font-size: 13px;
          color: #64748B;
          margin-bottom: 12px;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .course-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 11px;
          color: #64748B;
          margin-bottom: 12px;
        }

        .course-meta-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .course-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 12px;
          border-top: 1px solid #E2E8F0;
        }

        .course-price {
          font-weight: 700;
          font-size: 16px;
          color: #0F172A;
        }

        .course-badge-soon {
          font-size: 10px;
          color: #F59E0B;
          margin-left: 4px;
        }

        .btn-sm {
          padding: 8px 16px;
          font-size: 13px;
          background: #E2E8F0;
          color: #64748B;
          border-radius: 10px;
          border: none;
          cursor: not-allowed;
        }

        /* ========== STATS SECTION ========== */
        .stats-section {
          background: var(--navy);
          padding: 70px 16px;
          position: relative;
        }

        @media (max-width: 768px) {
          .stats-section {
            padding: 54px 16px;
          }
        }

        .stats-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .stats-header h2 {
          font-size: 32px;
          font-weight: 800;
          color: white;
          margin-bottom: 12px;
        }

        @media (max-width: 768px) {
          .stats-header h2 {
            font-size: 26px;
          }
        }

        .stats-header p {
          color: var(--muted);
          font-size: 14px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }

        .stat-card {
          background: var(--card-bg);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 28px 20px;
          text-align: center;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .stat-card:hover {
          transform: translateY(-3px);
          border-color: rgba(255, 255, 255, 0.16);
        }

        .stat-card:active {
          transform: scale(0.98);
        }

        .stat-icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
        }

        @media (max-width: 768px) {
          .stat-icon {
            width: 50px;
            height: 50px;
          }
        }

        .stat-value {
          font-size: 40px;
          font-weight: 800;
          margin-bottom: 8px;
        }

        @media (max-width: 768px) {
          .stat-value {
            font-size: 32px;
          }
        }

        .stat-label {
          color: var(--muted);
          font-size: 14px;
        }

        /* ========== CTA SECTION ========== */
        .cta-section {
          background: linear-gradient(135deg, #EFF6FF 0%, #F5F3FF 100%);
          padding: 70px 20px;
          text-align: center;
        }

        @media (max-width: 768px) {
          .cta-section {
            padding: 54px 20px;
          }
        }

        .cta-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #EFF6FF;
          border: 1px solid #BFDBFE;
          border-radius: 100px;
          padding: 5px 14px;
          color: #2563EB;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .cta-title {
          font-size: 32px;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 16px;
        }

        @media (max-width: 768px) {
          .cta-title {
            font-size: 26px;
          }
        }

        .cta-desc {
          color: #64748B;
          font-size: 16px;
          margin-bottom: 32px;
        }

        @media (max-width: 480px) {
          .cta-desc {
            font-size: 14px;
          }
        }

        .cta-buttons {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }

        @media (max-width: 480px) {
          .cta-buttons {
            flex-direction: column;
          }
          .cta-buttons .btn {
            width: 100%;
            justify-content: center;
          }
        }

        /* Orbs */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .orb-1 { width: 300px; height: 300px; background: rgba(37, 99, 235, 0.15); top: -100px; right: -100px; }
        .orb-2 { width: 250px; height: 250px; background: rgba(99, 102, 241, 0.12); bottom: -80px; left: -50px; }
        .orb-3 { width: 200px; height: 200px; background: rgba(245, 158, 11, 0.08); top: 50%; right: 20%; }

        @media (max-width: 768px) {
          .orb-1 { width: 200px; height: 200px; }
          .orb-2 { width: 180px; height: 180px; }
          .orb-3 { width: 150px; height: 150px; }
        }

        /* Grid overlay */
        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
          pointer-events: none;
        }

        /* Wave */
        .hero-wave {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          line-height: 0;
        }

        @media (max-width: 768px) {
          .hero-wave svg {
            height: 30px;
          }
        }

        /* Helper */
        .link-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          color: var(--electric);
          text-decoration: none;
          transition: gap 0.2s ease;
        }

        .link-btn:hover {
          gap: 10px;
        }

        /* Two column layout for desktop */
        @media (min-width: 768px) {
          .hero-two-col {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 48px;
            align-items: center;
          }
          .hero-visual-card {
            margin-top: 0;
          }
        }

        .animate-fade-up {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.6s ease forwards;
        }

        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {showIntro && (
        <div className={`terminal-overlay ${introFading ? 'fade-out' : ''}`}>
          <TerminalBoot userName={user?.name} onDone={handleIntroDone} />
        </div>
      )}

      <Header />

      {/* HERO SECTION */}
      <section className="hero">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="grid-overlay" />

        <div className="container">
          <div className={mounted ? "hero-two-col" : ""} style={{ position: 'relative', zIndex: 2 }}>
            {/* Left side - Text */}
            <div className="hero-content">
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

              <div className="hero-buttons">
                <Link to="/courses" className="btn btn-primary">
                  Kurslarni ko'rish <ChevronRight size={16} />
                </Link>
                <Link to="/register" className="btn btn-ghost">
                  <PlayCircle size={16} />
                  Bepul boshlash
                </Link>
              </div>

              <div className="benefits-list">
                {benefits.map(b => (
                  <div key={b} className="benefit-item">
                    <CheckCircle size={14} />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - Visual Card */}
            <div className="hero-visual-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg,#2563EB,#38BDF8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Code size={20} color="#fff" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#F8FAFC' }}>React.js Kursi</div>
                  <div style={{ fontSize: 12, color: '#64748B' }}>12 ta dars • 4 soat</div>
                </div>
              </div>
              <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 6 }}>Jarayon: 72%</div>
              <div className="progress-bar">
                <div className="progress-fill" />
              </div>
              <div className="tech-tags">
                {['useState', 'useEffect', 'Props'].map(tag => (
                  <span key={tag} className="tech-tag">{tag}</span>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20, gap: 12, flexWrap: 'wrap' }}>
                <div className="floating-badge">
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Users size={16} color="#2563EB" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 12 }}>+24 o'quvchi</div>
                    <div style={{ fontSize: 10, color: '#64748B' }}>bugun qo'shildi</div>
                  </div>
                </div>
                <div className="floating-badge" style={{ animationDelay: '0.4s' }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Star size={16} color="#F59E0B" fill="#F59E0B" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 12 }}>4.9 / 5.0</div>
                    <div style={{ fontSize: 10, color: '#64748B' }}>o'rtacha baho</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-wave">
          <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" style={{ width: '100%', height: 50 }}>
            <path d="M0 60V30C180 0 360 0 540 20C720 40 900 60 1080 50C1260 40 1380 20 1440 10V60H0Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Yo'nalishni tanlang</h2>
              <p className="section-sub">Qiziqishingizga mos kurslarni toping</p>
            </div>
          </div>

          <div className="categories-grid">
            {categories.map(cat => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <div
                  key={cat.id}
                  className={`category-card ${isActive ? 'active' : ''}`}
                  style={isActive ? { '--active-color': cat.accent, '--active-bg': cat.accent + '14' } as React.CSSProperties : {}}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <div
                    className="category-icon"
                    style={{ background: isActive ? cat.accent : cat.accent + '18' }}
                  >
                    <Icon size={24} color={isActive ? '#fff' : cat.accent} />
                  </div>
                  <p className="category-name">{cat.name}</p>
                  <p className="category-desc">{cat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* COURSES SECTION */}
      <section className="courses-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">
                {selectedCategory === 'all' ? 'Mashhur kurslar' : `${categories.find(c => c.id === selectedCategory)?.name} kurslari`}
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
                className="course-card"
                style={{
                  animation: mounted ? `fadeUp 0.5s ease forwards ${idx * 0.05}s` : 'none',
                  opacity: 0,
                }}
              >
                <div className="course-image">
                  <img src={course.image} alt={course.titleUz} />
                  <span className={`course-badge ${getCategoryColor(course.category)}`}>
                    {course.category}
                  </span>
                  <span className={`course-level ${getLevelBadge(course.level)}`}>
                    {getLevelName(course.level)}
                  </span>
                  <div className="coming-soon-overlay">
                    <div>
                      <div className="coming-soon-badge">
                        <Clock className="w-3.5 h-3.5" />
                        Tez orada
                      </div>
                      <p style={{ color: 'white', fontSize: 11 }}>Darslar tayyorlanmoqda</p>
                    </div>
                  </div>
                </div>
                <div className="course-content">
                  <h3 className="course-title">{course.titleUz}</h3>
                  <p className="course-desc">{course.descriptionUz}</p>
                  <div className="course-meta">
                    <div className="course-meta-item">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="course-meta-item">
                      <Users className="w-3 h-3" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                    <div className="course-meta-item">
                      <Clock className="w-3 h-3" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                  <div className="course-footer">
                    <div>
                      <span className="course-price">{course.price.toLocaleString()} so'm</span>
                      <span className="course-badge-soon">(Tez orada)</span>
                    </div>
                    <button className="btn-sm" disabled onClick={(e) => e.preventDefault()}>Ko'rish</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="stats-section">
        <div className="orb orb-1" style={{ opacity: 0.4 }} />
        <div className="orb orb-2" style={{ opacity: 0.3 }} />
        <div className="container">
          <div className="stats-header">
            <h2>Raqamlar bizni tasdiqlaydi</h2>
            <p>Minglab o'quvchilar va o'qituvchilarning ishonchi</p>
          </div>
          <div className="stats-grid">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="stat-card">
                  <div className="stat-icon" style={{ background: s.color + '20' }}>
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

      {/* CTA SECTION */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-badge">
            <Zap size={12} />
            Bugun boshlang
          </div>
          <h2 className="cta-title">Karyerangizni<br />keyingi bosqichga olib chiqing</h2>
          <p className="cta-desc">
            Birinchi darsni bepul ko'ring. Ro'yxatdan o'tish 30 soniya oladi.
          </p>
          <div className="cta-buttons">
            <Link to="/register" className="btn btn-primary" style={{ fontSize: 14, padding: '12px 24px' }}>
              Bepul boshlash <ChevronRight size={16} />
            </Link>
            <Link to="/courses" className="btn" style={{ background: 'white', color: '#0F172A', border: '1px solid #CBD5E1', fontSize: 14, padding: '12px 24px' }}>
              <Globe size={14} color="#2563EB" />
              Kurslarni ko'rish
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
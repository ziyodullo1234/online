import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { User, BookOpen, LogOut, Gamepad2, Menu, X, ArrowRight } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Bosh sahifa' },
  { to: '/courses', label: 'Kurslar' },
  { to: '/games', label: "O'yinlar", icon: Gamepad2, badge: true },
];

const INK = '#16233F';
const PAPER = '#FBFAF6';
const TEAL = '#0E7C7B';
const AMBER = '#E2A63B';
const LINE = '#E7E2D6';
const TINT = '#F1EDE3';

export function Header() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const initials = user?.name
    ?.trim()
    .split(/\s+/)
    .map((n: string) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  // Har doim bir xil ko'rinish uchun aktiv holatni tekshirish
  const isHomeActive = location.pathname === '/';
  const isCoursesActive = location.pathname.startsWith('/courses');
  const isGamesActive = location.pathname.startsWith('/games');
  const isProfileActive = location.pathname.startsWith('/profile');

  return (
    <header
      className="sticky top-0 z-50 transition-colors duration-300"
      style={{
        backgroundColor: scrolled ? `${PAPER}E6` : `${PAPER}B3`,
        backdropFilter: 'blur(10px)',
        borderBottom: `1px ${scrolled ? 'solid' : 'dashed'} ${LINE}`,
        boxShadow: scrolled ? `0 1px 0 ${LINE}, 0 8px 20px -12px rgba(22,35,63,0.18)` : 'none',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&display=swap');
        .brand-font { font-family: 'Fraunces', Georgia, serif; }
        .stamp-btn {
          border: 2px solid ${INK};
          box-shadow: 3px 3px 0 0 ${INK};
          transition: transform 0.12s ease, box-shadow 0.12s ease;
        }
        .stamp-btn:hover { transform: translate(-1px, -1px); box-shadow: 4px 4px 0 0 ${INK}; }
        .stamp-btn:active { transform: translate(2px, 2px); box-shadow: 0px 0px 0 0 ${INK}; }
        @keyframes menuDrop {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .menu-drop { animation: menuDrop 0.22s ease forwards; }
        .menu-item-in { opacity: 0; animation: menuDrop 0.28s ease forwards; }
      `}</style>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <span
              className="relative flex items-center justify-center w-9 h-9 rounded-full shrink-0 transition-transform duration-150 group-hover:-translate-y-0.5"
              style={{ border: `2px solid ${INK}`, backgroundColor: PAPER, boxShadow: `2px 2px 0 0 ${INK}` }}
            >
              <span className="brand-font text-[16px] leading-none" style={{ color: INK, fontWeight: 700 }}>
                E
              </span>
            </span>
            <span className="flex flex-col leading-none">
              <span className="brand-font text-[19px] font-semibold tracking-tight" style={{ color: INK }}>
                Erkinov
              </span>
              <span
                className="text-[10px] font-semibold tracking-[0.16em] uppercase mt-0.5"
                style={{ color: TEAL }}
              >
                O'quv markazi
              </span>
            </span>
          </Link>

          {/* Desktop nav - BARCHA SAHIFALARDA BIR XIL */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Bosh sahifa */}
            <Link
              to="/"
              className="relative flex items-center gap-1.5 px-3.5 py-2 rounded-md text-[14.5px] font-semibold transition-colors duration-150"
              style={{
                color: isHomeActive ? PAPER : `${INK}B3`,
                backgroundColor: isHomeActive ? INK : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (!isHomeActive) e.currentTarget.style.backgroundColor = TINT;
              }}
              onMouseLeave={(e) => {
                if (!isHomeActive) e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Bosh sahifa
            </Link>

            {/* Kurslar */}
            <Link
              to="/courses"
              className="relative flex items-center gap-1.5 px-3.5 py-2 rounded-md text-[14.5px] font-semibold transition-colors duration-150"
              style={{
                color: isCoursesActive ? PAPER : `${INK}B3`,
                backgroundColor: isCoursesActive ? INK : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (!isCoursesActive) e.currentTarget.style.backgroundColor = TINT;
              }}
              onMouseLeave={(e) => {
                if (!isCoursesActive) e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <BookOpen className="w-4 h-4" strokeWidth={2.25} />
              Kurslar
            </Link>

            {/* O'yinlar */}
            <Link
              to="/games"
              className="relative flex items-center gap-1.5 px-3.5 py-2 rounded-md text-[14.5px] font-semibold transition-colors duration-150"
              style={{
                color: isGamesActive ? PAPER : `${INK}B3`,
                backgroundColor: isGamesActive ? INK : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (!isGamesActive) e.currentTarget.style.backgroundColor = TINT;
              }}
              onMouseLeave={(e) => {
                if (!isGamesActive) e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <Gamepad2 className="w-4 h-4" strokeWidth={2.25} />
              O'yinlar
              <span
                className="inline-block w-[7px] h-[7px] rounded-[2px]"
                style={{ backgroundColor: isGamesActive ? AMBER : AMBER, transform: 'rotate(8deg)' }}
              />
            </Link>

            {/* Profil - faqat login qilganlar uchun */}
            {user && (
              <Link
                to="/profile"
                className="px-3.5 py-2 rounded-md text-[14.5px] font-semibold transition-colors duration-150"
                style={{
                  color: isProfileActive ? PAPER : `${INK}B3`,
                  backgroundColor: isProfileActive ? INK : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (!isProfileActive) e.currentTarget.style.backgroundColor = TINT;
                }}
                onMouseLeave={(e) => {
                  if (!isProfileActive) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Profil
              </Link>
            )}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2.5">
              {user ? (
                <>
                  <Link to="/profile">
                    <Button variant="ghost" className="gap-2 rounded-md pl-1.5 pr-3 hover:bg-transparent" style={{ color: INK }}>
                      <span
                        className="flex items-center justify-center w-7 h-7 rounded-full brand-font text-[12px] font-bold"
                        style={{ border: `1.5px solid ${INK}`, color: INK, backgroundColor: PAPER }}
                      >
                        {initials || <User className="w-3.5 h-3.5" />}
                      </span>
                      <span className="font-medium">{user.name}</span>
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={logout}
                    className="gap-2 rounded-md border-[1.5px] transition-colors"
                    style={{ borderColor: LINE, color: `${INK}B3` }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = INK;
                      e.currentTarget.style.color = INK;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = LINE;
                      e.currentTarget.style.color = `${INK}B3`;
                    }}
                  >
                    <LogOut className="w-4 h-4" />
                    Chiqish
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <button
                      className="text-[14.5px] font-semibold px-2 py-2 underline-offset-4 hover:underline transition-all"
                      style={{ color: INK }}
                    >
                      Kirish
                    </button>
                  </Link>
                  <Link to="/register">
                    <button
                      className="stamp-btn rounded-md flex items-center gap-1.5 px-4 py-2 text-[14.5px] font-semibold"
                      style={{ backgroundColor: INK, color: PAPER }}
                    >
                      Ro'yxatdan o'tish
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden relative flex items-center justify-center w-9 h-9 rounded-md"
              style={{ border: `1.5px solid ${INK}` }}
              aria-label={menuOpen ? 'Menyuni yopish' : 'Menyuni ochish'}
            >
              <Menu
                className="w-4.5 h-4.5 absolute transition-all duration-150"
                style={{ color: INK, opacity: menuOpen ? 0 : 1, transform: menuOpen ? 'rotate(90deg)' : 'rotate(0)' }}
              />
              <X
                className="w-4.5 h-4.5 absolute transition-all duration-150"
                style={{ color: INK, opacity: menuOpen ? 1 : 0, transform: menuOpen ? 'rotate(0)' : 'rotate(-90deg)' }}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="md:hidden menu-drop overflow-hidden pb-3"
            style={{ borderTop: `1px dashed ${LINE}` }}
          >
            <div className="pt-2">
              {/* Bosh sahifa */}
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                style={{
                  color: isHomeActive ? PAPER : `${INK}CC`,
                  backgroundColor: isHomeActive ? INK : 'transparent',
                  borderBottom: `1px dashed ${LINE}`,
                }}
                className="menu-item-in flex items-center gap-2 px-3 py-3 rounded-md text-[15px] font-semibold"
              >
                Bosh sahifa
              </Link>

              {/* Kurslar */}
              <Link
                to="/courses"
                onClick={() => setMenuOpen(false)}
                style={{
                  color: isCoursesActive ? PAPER : `${INK}CC`,
                  backgroundColor: isCoursesActive ? INK : 'transparent',
                  borderBottom: `1px dashed ${LINE}`,
                }}
                className="menu-item-in flex items-center gap-2 px-3 py-3 rounded-md text-[15px] font-semibold"
              >
                <BookOpen className="w-4 h-4" />
                Kurslar
              </Link>

              {/* O'yinlar */}
              <Link
                to="/games"
                onClick={() => setMenuOpen(false)}
                style={{
                  color: isGamesActive ? PAPER : `${INK}CC`,
                  backgroundColor: isGamesActive ? INK : 'transparent',
                  borderBottom: `1px dashed ${LINE}`,
                }}
                className="menu-item-in flex items-center gap-2 px-3 py-3 rounded-md text-[15px] font-semibold"
              >
                <Gamepad2 className="w-4 h-4" />
                O'yinlar
                <span className="w-[7px] h-[7px] rounded-[2px] ml-auto" style={{ backgroundColor: AMBER }} />
              </Link>

              {/* Profil */}
              {user && (
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    color: isProfileActive ? PAPER : `${INK}CC`,
                    backgroundColor: isProfileActive ? INK : 'transparent',
                  }}
                  className="menu-item-in flex items-center gap-2 px-3 py-3 rounded-md text-[15px] font-semibold"
                >
                  <span
                    className="flex items-center justify-center w-5 h-5 rounded-full brand-font text-[10px] font-bold"
                    style={{ border: `1px solid currentColor` }}
                  >
                    {initials || <User className="w-3 h-3" />}
                  </span>
                  {user.name}
                </Link>
              )}
            </div>

            <div className="menu-item-in flex gap-2 px-1 pt-2">
              {user ? (
                <Button
                  variant="outline"
                  onClick={logout}
                  className="gap-2 w-full rounded-md border-[1.5px]"
                  style={{ borderColor: LINE, color: `${INK}B3` }}
                >
                  <LogOut className="w-4 h-4" />
                  Chiqish
                </Button>
              ) : (
                <>
                  <Link to="/login" className="flex-1" onClick={() => setMenuOpen(false)}>
                    <button className="w-full text-[14.5px] font-semibold py-2.5 rounded-md" style={{ border: `1.5px solid ${LINE}`, color: INK }}>
                      Kirish
                    </button>
                  </Link>
                  <Link to="/register" className="flex-1" onClick={() => setMenuOpen(false)}>
                    <button
                      className="stamp-btn w-full rounded-md flex items-center justify-center gap-1.5 py-2.5 text-[14.5px] font-semibold"
                      style={{ backgroundColor: INK, color: PAPER }}
                    >
                      Ro'yxatdan o'tish
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
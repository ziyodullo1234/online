import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { User, BookOpen, LogOut, Gamepad2, Menu, X } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Bosh sahifa' },
  { to: '/courses', label: 'Kurslar' },
  { to: '/games', label: "O'yinlar", icon: Gamepad2 },
];

export function Header() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => (path === '/' ? location.pathname === '/' : location.pathname.startsWith(path));

  const initials = user?.name
    ?.trim()
    .split(/\s+/)
    .map((n: string) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-500 shadow-sm shadow-indigo-200 group-hover:shadow-indigo-300 transition-shadow">
              <BookOpen className="w-5 h-5 text-white" />
            </span>
            <span className="text-xl font-extrabold tracking-tight text-gray-900">Erkinov</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active ? 'text-indigo-700 bg-indigo-50' : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {item.label}
                </Link>
              );
            })}
            {user && (
              <Link
                to="/profile"
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/profile') ? 'text-indigo-700 bg-indigo-50' : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                Profil
              </Link>
            )}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              {user ? (
                <>
                  <Link to="/profile">
                    <Button variant="ghost" className="gap-2 rounded-full pl-1.5 pr-3">
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">
                        {initials || <User className="w-3.5 h-3.5" />}
                      </span>
                      {user.name}
                    </Button>
                  </Link>
                  <Button variant="outline" onClick={logout} className="gap-2">
                    <LogOut className="w-4 h-4" />
                    Chiqish
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline">Kirish</Button>
                  </Link>
                  <Link to="/register">
                    <Button className="bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-200">Ro'yxatdan o'tish</Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
              aria-label={menuOpen ? 'Menyuni yopish' : 'Menyuni ochish'}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium ${
                    active ? 'text-indigo-700 bg-indigo-50' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {item.label}
                </Link>
              );
            })}
            {user && (
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive('/profile') ? 'text-indigo-700 bg-indigo-50' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold">
                  {initials || <User className="w-3 h-3" />}
                </span>
                {user.name}
              </Link>
            )}
            <div className="pt-2 flex gap-2 px-1">
              {user ? (
                <Button variant="outline" onClick={logout} className="gap-2 w-full">
                  <LogOut className="w-4 h-4" />
                  Chiqish
                </Button>
              ) : (
                <>
                  <Link to="/login" className="flex-1" onClick={() => setMenuOpen(false)}>
                    <Button variant="outline" className="w-full">Kirish</Button>
                  </Link>
                  <Link to="/register" className="flex-1" onClick={() => setMenuOpen(false)}>
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Ro'yxatdan o'tish</Button>
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
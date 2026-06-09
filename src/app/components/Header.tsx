import { Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { User, BookOpen, LogOut, Gamepad2 } from 'lucide-react';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className="w-8 h-8 text-blue-600" />
          <span className="text-2xl font-bold">Ziyodullo_erkinov</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-blue-600 transition">
            Bosh sahifa
          </Link>
          <Link to="/courses" className="hover:text-blue-600 transition">
            Kurslar
          </Link>
          <Link to="/games" className="hover:text-blue-600 transition flex items-center gap-1">
            <Gamepad2 className="w-4 h-4" />
            O'yinlar
          </Link>
          {user && (
            <Link to="/profile" className="hover:text-blue-600 transition">
              Profil
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link to="/profile">
                <Button variant="ghost" className="gap-2">
                  <User className="w-4 h-4" />
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
                <Button>Ro'yxatdan o'tish</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
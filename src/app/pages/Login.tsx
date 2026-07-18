import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';
import { Mail, Lock, Eye, EyeOff, ArrowRight, LogIn, CheckCircle, Shield, Zap } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Email va parolni kiriting!');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      if (login(email, password)) {
        toast.success('Muvaffaqiyatli kirdingiz!');
        navigate('/');
      } else {
        toast.error('Email yoki parol noto\'g\'ri!');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/40">
      <Header />
      <div className="container mx-auto px-4 py-6 md:py-12 flex items-center justify-center">
        <div className="w-full max-w-[1000px] grid md:grid-cols-2 gap-8">

          {/* Left Side - Info */}
          <div className="hidden md:flex flex-col justify-center">
            <div className="max-w-md">
              <div className="mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20">
                  <LogIn className="w-6 h-6 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                Xush kelibsiz
              </h1>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Akkountingizga kiring va o'qishni davom eting
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-50 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-indigo-600" />
                  </div>
                  <span className="text-gray-600">50+ professional kurslar</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-50 rounded-full flex items-center justify-center">
                    <Zap className="w-4 h-4 text-indigo-600" />
                  </div>
                  <span className="text-gray-600">Tez va samarali o'qish</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-50 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-indigo-600" />
                  </div>
                  <span className="text-gray-600">Xavfsiz va ishonchli</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <Card className="border-0 shadow-2xl shadow-gray-200/60 rounded-2xl">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Kirish
              </CardTitle>
              <CardDescription className="text-gray-500">
                Akkountingizga kirish uchun ma'lumotlaringizni kiriting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="pl-10 h-11 border-gray-200 focus:border-indigo-400 focus:ring-indigo-400/20 rounded-xl"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Parol
                    </Label>
                    <Link
                      to="/forgot-password"
                      className="text-xs text-indigo-500 hover:text-indigo-700 transition-colors"
                    >
                      Parolni unutdingiz?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pl-10 pr-10 h-11 border-gray-200 focus:border-indigo-400 focus:ring-indigo-400/20 rounded-xl"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-400" />
                    <span className="text-sm text-gray-600">Eslab qolish</span>
                  </label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-11 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white transition-all rounded-xl shadow-lg shadow-indigo-500/20"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Kirilmoqda...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <span>Kirish</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>
              </form>

              {/* Register Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Akkountingiz yo'qmi?{' '}
                  <Link to="/register" className="text-indigo-600 font-medium hover:underline">
                    Ro'yxatdan o'ting
                  </Link>
                </p>
              </div>

              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-indigo-50/60 border border-indigo-100 rounded-xl">
                <p className="text-xs text-gray-500 text-center mb-2">
                  Demo hisob ma'lumotlari
                </p>
                <div className="space-y-1 text-center">
                  <p className="text-xs text-gray-500">
                    Email: demo@example.com
                  </p>
                  <p className="text-xs text-gray-500">
                    Parol: demo123
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
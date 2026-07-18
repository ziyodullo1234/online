import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, KeyRound, CheckCircle2 } from 'lucide-react';

type Step = 'email' | 'reset' | 'done';

export function ForgotPassword() {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { checkEmailExists, resetPassword } = useAuth();
  const navigate = useNavigate();

  const isPasswordStrong = newPassword.length >= 6;
  const doPasswordsMatch = newPassword === confirmPassword && confirmPassword.length > 0;

  const handleCheckEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error('Emailni kiriting!');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (checkEmailExists(email)) {
        setStep('reset');
      } else {
        toast.error('Bu email bilan ro\'yxatdan o\'tilmagan!');
      }
    }, 400);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPasswordStrong) {
      toast.error('Parol kamida 6 belgidan iborat bo\'lishi kerak!');
      return;
    }

    if (!doPasswordsMatch) {
      toast.error('Parollar mos emas!');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const success = resetPassword(email, newPassword);
      setIsLoading(false);
      if (success) {
        setStep('done');
        toast.success('Parol muvaffaqiyatli yangilandi!');
      } else {
        toast.error('Xatolik yuz berdi, qaytadan urinib ko\'ring!');
        setStep('email');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/40">
      <Header />
      <div className="container mx-auto px-4 py-6 md:py-12 flex items-center justify-center">
        <div className="w-full max-w-[440px]">
          <Card className="border-0 shadow-2xl shadow-gray-200/60 rounded-2xl">
            <CardHeader className="space-y-1 pb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-xl flex items-center justify-center mb-2 shadow-lg shadow-indigo-500/20">
                {step === 'done' ? (
                  <CheckCircle2 className="w-6 h-6 text-white" />
                ) : (
                  <KeyRound className="w-6 h-6 text-white" />
                )}
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                {step === 'email' && 'Parolni tiklash'}
                {step === 'reset' && 'Yangi parol o\'rnating'}
                {step === 'done' && 'Parol yangilandi'}
              </CardTitle>
              <CardDescription className="text-gray-500">
                {step === 'email' && "Ro'yxatdan o'tgan emailingizni kiriting"}
                {step === 'reset' && `${email} uchun yangi parol tanlang`}
                {step === 'done' && 'Endi yangi parolingiz bilan tizimga kirishingiz mumkin'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* STEP 1: Email */}
              {step === 'email' && (
                <form onSubmit={handleCheckEmail} className="space-y-5">
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

                  <Button
                    type="submit"
                    className="w-full h-11 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white transition-all rounded-xl shadow-lg shadow-indigo-500/20"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Tekshirilmoqda...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <span>Davom etish</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </Button>
                </form>
              )}

              {/* STEP 2: New password */}
              {step === 'reset' && (
                <form onSubmit={handleResetPassword} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
                      Yangi parol
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="newPassword"
                        type={showPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Kamida 6 belgi"
                        className="pl-10 pr-10 h-11 border-gray-200 focus:border-indigo-400 focus:ring-indigo-400/20 rounded-xl"
                        required
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {newPassword.length > 0 && (
                      <p className={`text-xs ${isPasswordStrong ? 'text-emerald-600' : 'text-gray-400'}`}>
                        {isPasswordStrong ? '✓ Parol kuchli' : 'Parol kamida 6 belgidan iborat bo\'lishi kerak'}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                      Yangi parolni tasdiqlang
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
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

                  <Button
                    type="submit"
                    className="w-full h-11 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white transition-all rounded-xl shadow-lg shadow-indigo-500/20"
                    disabled={isLoading || !isPasswordStrong || !doPasswordsMatch}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Saqlanmoqda...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <span>Parolni yangilash</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </Button>
                </form>
              )}

              {/* STEP 3: Done */}
              {step === 'done' && (
                <Button
                  onClick={() => navigate('/login')}
                  className="w-full h-11 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white transition-all rounded-xl shadow-lg shadow-indigo-500/20"
                >
                  <div className="flex items-center justify-center gap-2">
                    <span>Kirish sahifasiga o'tish</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Button>
              )}

              {step !== 'done' && (
                <div className="mt-6 text-center">
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Kirish sahifasiga qaytish
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
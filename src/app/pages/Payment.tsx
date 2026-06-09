import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { mockCourses } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import { CreditCard, Smartphone, Shield, CheckCircle, Clock, Award, Lock, ArrowLeft, Wallet, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export function Payment() {
  const { courseId } = useParams<{ courseId: string }>();
  const { enrollCourse } = useAuth();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'click' | 'payme'>('click');
  const [processing, setProcessing] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const course = mockCourses.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">😕</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">Kurs topilmadi</h2>
            <p className="text-gray-500 mb-6">So'ralgan kurs mavjud emas yoki o'chirilgan</p>
            <Button onClick={() => navigate('/courses')} className="bg-indigo-600 hover:bg-indigo-700">
              Kurslarga qaytish
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m';
  };

  const getLevelText = (level: string) => {
    switch(level) {
      case 'beginner': return 'Boshlang\'ich';
      case 'intermediate': return 'O\'rta';
      case 'pro': return 'Professional';
      default: return level;
    }
  };

  const getLevelColor = (level: string) => {
    switch(level) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-blue-100 text-blue-700';
      case 'pro': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handlePayment = () => {
    if (!agreed) {
      toast.error('Iltimos, to\'lov shartlarini qabul qiling');
      return;
    }
    
    setProcessing(true);
    
    // Simulate payment processing
    const timer = setTimeout(() => {
      enrollCourse(course.id);
      toast.success('To\'lov muvaffaqiyatli amalga oshirildi!', {
        description: `${course.titleUz} kursiga yozildingiz`,
        duration: 4000,
      });
      navigate(`/course/${course.id}`);
    }, 2000);

    return () => clearTimeout(timer);
  };

  const paymentMethods = [
    {
      id: 'click',
      name: 'Click',
      icon: CreditCard,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      description: 'Bank kartasi orqali to\'lov',
      gradient: 'linear-gradient(135deg, #2563eb, #1d4ed8)'
    },
    {
      id: 'payme',
      name: 'Payme',
      icon: Smartphone,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      description: 'Mobil to\'lov tizimi',
      gradient: 'linear-gradient(135deg, #10b981, #059669)'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Header />
      
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Orqaga</span>
        </button>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-indigo-50 rounded-full px-4 py-1.5 mb-4">
            <Lock className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-600">Xavfsiz to'lov</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            To'lov ma'lumotlari
          </h1>
          <p className="text-gray-500 mt-2">Kursni sotib olish uchun quyidagi ma'lumotlarni to'ldiring</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Method Selection */}
            <Card className="border-0 shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-indigo-100">
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-indigo-600" />
                  To'lov usulini tanlang
                </CardTitle>
              </div>
              <CardContent className="p-6">
                <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      const isSelected = paymentMethod === method.id;
                      return (
                        <div
                          key={method.id}
                          className={`relative cursor-pointer transition-all duration-300 ${
                            isSelected ? 'scale-[1.02]' : 'hover:scale-[1.01]'
                          }`}
                        >
                          <div
                            className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
                              isSelected ? `bg-gradient-to-r ${method.color} opacity-10` : 'opacity-0'
                            }`}
                          />
                          <div className={`flex items-center space-x-4 p-4 rounded-xl border-2 transition-all duration-200 ${
                            isSelected 
                              ? `border-${method.id === 'click' ? 'blue' : 'green'}-500 shadow-lg` 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}>
                            <RadioGroupItem value={method.id} id={method.id} />
                            <Label htmlFor={method.id} className="flex items-center gap-4 flex-1 cursor-pointer">
                              <div className={`w-14 h-14 ${method.bgColor} rounded-xl flex items-center justify-center transition-all duration-300 ${
                                isSelected ? 'scale-110' : ''
                              }`}>
                                <Icon className={`w-7 h-7 ${method.iconColor}`} />
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold text-lg">{method.name}</div>
                                <div className="text-sm text-gray-500">{method.description}</div>
                              </div>
                              {isSelected && (
                                <div className="text-indigo-600">
                                  <CheckCircle className="w-5 h-5" />
                                </div>
                              )}
                            </Label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </RadioGroup>

                {/* Demo Mode Notice */}
                <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Demo rejim</p>
                      <p className="text-xs text-yellow-700 mt-1">
                        Bu to'lov demo rejimda ishlaydi. Haqiqiy to'lov amalga oshirilmaydi. 
                        Karta ma'lumotlari talab qilinmaydi.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Agreement Checkbox */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-0.5 w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-600">
                      Men <button className="text-indigo-600 hover:underline">to'lov shartlari</button> va{' '}
                      <button className="text-indigo-600 hover:underline">xavfsizlik qoidalariga</button> roziman
                    </span>
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Payment Details Card */}
            <Card className="border-0 shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-indigo-600" />
                  To'lov ma'lumotlari
                </CardTitle>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Kurs narxi:</span>
                  <span className="font-semibold text-gray-800">{formatPrice(course.price)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Chegirma:</span>
                  <span className="font-medium text-green-600">- 0 so'm</span>
                </div>
                <div className="flex justify-between py-3 mt-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl px-4">
                  <span className="font-bold text-gray-800">Jami to'lov:</span>
                  <span className="font-bold text-2xl text-indigo-600">{formatPrice(course.price)}</span>
                </div>
                
                {/* Security Badges */}
                <div className="flex justify-center gap-4 pt-4">
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Lock className="w-3 h-3" />
                    <span>256-bit SSL</span>
                  </div>
                  <div className="w-px h-4 bg-gray-200"></div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Shield className="w-3 h-3" />
                    <span>Xavfsiz to'lov</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-0 shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                <CardTitle className="text-white flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Buyurtma haqida
                </CardTitle>
              </div>
              <CardContent className="p-6 space-y-4">
                {/* Course Image */}
                <div className="relative rounded-xl overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.titleUz}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getLevelColor(course.level)}`}>
                      {getLevelText(course.level)}
                    </span>
                  </div>
                </div>
                
                {/* Course Info */}
                <div>
                  <h3 className="font-bold text-lg mb-1 line-clamp-2">{course.titleUz}</h3>
                  <p className="text-sm text-gray-500">{course.instructor}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <div className="flex text-yellow-400">
                      {'★'.repeat(5)}
                    </div>
                    <span className="text-xs text-gray-500">(4.9)</span>
                  </div>
                </div>

                {/* Course Details */}
                <div className="space-y-3 pt-3 border-t border-gray-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">📚 Darslar:</span>
                    <span className="font-medium">{course.lessons.length} ta</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">⏱️ Davomiyligi:</span>
                    <span className="font-medium">~{course.lessons.length * 15} daqiqa</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">🎓 Sertifikat:</span>
                    <span className="text-green-600 font-medium">✓ Bor</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">🔄 Qaytarish:</span>
                    <span className="font-medium">7 kun</span>
                  </div>
                </div>

                {/* Payment Button */}
                <Button 
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 mt-4"
                  size="lg" 
                  onClick={handlePayment}
                  disabled={processing}
                >
                  {processing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>To'lov amalga oshirilmoqda...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      <span>To'lovni amalga oshirish</span>
                    </div>
                  )}
                </Button>

                {/* Money Back Guarantee */}
                <div className="text-center pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                    <Award className="w-4 h-4" />
                    <span>7 kun ichida pulni qaytarish kafolati</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-2">
                    <Clock className="w-4 h-4" />
                    <span>Cheksiz muddatga kirish</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
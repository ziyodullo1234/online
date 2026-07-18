import { useNavigate, Link } from 'react-router';
import { useState, useRef } from 'react';
import { Header } from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { mockCourses } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Button } from '../components/ui/button';
import { User, Mail, Phone, BookOpen, Award, Camera, Calendar, LogOut, ChevronRight, UploadCloud, Clock, X } from 'lucide-react';
import { Badge } from '../components/ui/badge';

const AVATAR_OPTIONS = [
  'https://ui-avatars.com/api/?background=6366f1&color=fff&bold=true&size=128&name=User',
  'https://ui-avatars.com/api/?background=8b5cf6&color=fff&bold=true&size=128&name=Student',
  'https://ui-avatars.com/api/?background=06b6d4&color=fff&bold=true&size=128&name=Learner',
  'https://ui-avatars.com/api/?background=10b981&color=fff&bold=true&size=128&name=Member',
];

export function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showAvatarOptions, setShowAvatarOptions] = useState(false);
  const [avatar, setAvatar] = useState(AVATAR_OPTIONS[0]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!user) {
    navigate('/login');
    return null;
  }

  // Darslari bo'lgan kurslarni filter qilish (faqat darslari bor kurslar)
  const enrolledCourses = mockCourses.filter(c =>
    user.enrolledCourses.includes(c.id) && c.lessons && c.lessons.length > 0
  );

  // "Tez orada" kurslari (darslari yo'q)
  const comingSoonCourses = mockCourses.filter(c =>
    user.enrolledCourses.includes(c.id) && (!c.lessons || c.lessons.length === 0)
  );

  const getProgressPercentage = (courseId: string) => {
    const progress = user.progress[courseId];
    if (!progress) return 0;
    const course = mockCourses.find(c => c.id === courseId);
    if (!course || !course.lessons) return 0;
    return Math.round((progress.completedLessons.length / course.lessons.length) * 100);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
        setShowAvatarOptions(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-12">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Sahifa Sarlavhasi */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Mening profilim</h1>
            <p className="text-slate-500 mt-2">Shaxsiy ma'lumotlaringiz va o'quv jarayoningizni kuzatib boring.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Chap ustun - Profil kartasi */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="overflow-hidden border-0 shadow-lg shadow-slate-200/50 rounded-2xl">
              {/* Premium Muqova Gradienti */}
              <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: 'radial-gradient(circle at 20% 30%, white 0%, transparent 40%), radial-gradient(circle at 80% 70%, white 0%, transparent 35%)'
                }} />
              </div>

              <CardContent className="px-6 pb-6 pt-0 relative">
                {/* Avatar qismi */}
                <div className="flex flex-col items-center">
                  <div className="relative -mt-16 mb-4">
                    <div className="relative group">
                      <img
                        src={avatar}
                        alt={user.name}
                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md bg-white cursor-pointer transition-transform duration-300 group-hover:scale-105"
                        onClick={() => setShowAvatarOptions(!showAvatarOptions)}
                      />
                      <button
                        onClick={() => setShowAvatarOptions(!showAvatarOptions)}
                        className="absolute bottom-1 right-1 bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-full p-2.5 shadow-lg border-2 border-white"
                      >
                        <Camera className="w-4 h-4 text-white" />
                      </button>
                    </div>

                    {/* Avatar opsiyalari */}
                    {showAvatarOptions && (
                      <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl shadow-slate-300/40 p-4 z-20 w-[calc(100vw-2.5rem)] max-w-72 border border-slate-100 animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-semibold text-slate-700">Rasm tanlang</span>
                          <button onClick={() => setShowAvatarOptions(false)} className="text-slate-400 hover:text-slate-600 p-1 -m-1 rounded-full hover:bg-slate-100 transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-4 gap-3 mb-4">
                          {AVATAR_OPTIONS.map((opt, idx) => (
                            <button
                              key={idx}
                              onClick={() => { setAvatar(opt); setShowAvatarOptions(false); }}
                              className={`w-14 h-14 rounded-full overflow-hidden transition-all focus:outline-none focus:ring-4 focus:ring-indigo-200 ${
                                avatar === opt ? 'ring-4 ring-indigo-500' : 'hover:ring-4 hover:ring-indigo-100'
                              }`}
                            >
                              <img src={opt} alt="" className="w-full h-full object-cover" />
                            </button>
                          ))}
                        </div>

                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <Button
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full flex items-center justify-center gap-2 border-dashed border-2 hover:bg-indigo-50/50 hover:border-indigo-300 hover:text-indigo-700 transition-colors rounded-xl"
                        >
                          <UploadCloud className="w-4 h-4" />
                          Yuklash
                        </Button>
                      </div>
                    )}
                  </div>

                  <h2 className="text-2xl font-bold text-slate-900">{user.name}</h2>
                  <Badge className="mt-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-200 px-3 py-1">
                    Faol o'quvchi
                  </Badge>
                </div>

                {/* Shaxsiy Ma'lumotlar */}
                <div className="space-y-1 border-t border-slate-100 mt-6 pt-6">
                  <div className="flex items-center gap-4 text-slate-600 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100 text-indigo-500 shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium truncate flex-1 min-w-0">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-600 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100 text-indigo-500 shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">{user.phone || '+998 90 123 45 67'}</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-600 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100 text-indigo-500 shrink-0">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">A'zo bo'lgan vaqti: 2024</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-600 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100 text-indigo-500 shrink-0">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">{enrolledCourses.length + comingSoonCourses.length} ta kurs</span>
                  </div>
                </div>

                {/* Chiqish tugmasi */}
                <Button
                  variant="ghost"
                  className="w-full mt-6 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl"
                  onClick={() => logout()}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Hisobdan chiqish
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* O'ng ustun - Kurslar ro'yxati */}
          <div className="lg:col-span-8 space-y-6">
            {/* Kurslar kartasi */}
            <Card className="border-0 shadow-lg shadow-slate-200/50 rounded-2xl">
              <CardHeader className="border-b border-slate-100 pb-6">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-500" />
                  Mening kurslarim
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">

                {enrolledCourses.length === 0 && comingSoonCourses.length === 0 ? (
                  // Bo'sh holat (Empty State)
                  <div className="text-center py-16 px-4 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
                    <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <BookOpen className="w-10 h-10 text-slate-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Hali kurslar yo'q</h3>
                    <p className="text-slate-500 mb-6 max-w-sm mx-auto">Siz hali birorta kursga yozilmagansiz. Bilimingizni oshirish uchun yangi kurslarni kashf eting.</p>
                    <Link to="/courses">
                      <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 rounded-xl">
                        Kurslarni ko'rish
                      </Button>
                    </Link>
                  </div>
                ) : (
                  // Kurslar ro'yxati
                  <div className="space-y-8">
                    {/* Faol kurslar */}
                    {enrolledCourses.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4 flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-indigo-500" />
                          Faol kurslar
                        </h3>
                        <div className="grid grid-cols-1 gap-5">
                          {enrolledCourses.map((course) => {
                            const progress = getProgressPercentage(course.id);
                            const completedCount = user.progress[course.id]?.completedLessons.length || 0;
                            const hasCertificate = user.progress[course.id]?.certificateIssued;

                            return (
                              <div
                                key={course.id}
                                className="group bg-white border border-slate-100 rounded-2xl p-5 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/40 transition-all duration-300 hover:-translate-y-1"
                              >
                                <div className="flex flex-col sm:flex-row gap-5 items-start">
                                  {/* Kurs Rasmi */}
                                  <div className="relative shrink-0 overflow-hidden rounded-xl">
                                    <img
                                      src={course.image}
                                      alt={course.titleUz}
                                      className="w-full sm:w-32 h-32 sm:h-24 object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {progress === 100 && (
                                      <div className="absolute inset-0 bg-emerald-500/20 backdrop-blur-[2px] flex items-center justify-center">
                                        <div className="bg-white p-1.5 rounded-full shadow-sm">
                                          <Award className="w-5 h-5 text-emerald-600" />
                                        </div>
                                      </div>
                                    )}
                                  </div>

                                  {/* Kurs Ma'lumotlari */}
                                  <div className="flex-1 w-full min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                                      <div className="min-w-0">
                                        <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">{course.titleUz}</h3>
                                        <p className="text-sm text-slate-500 font-medium truncate">{course.instructor}</p>
                                      </div>
                                      {hasCertificate && (
                                        <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200 whitespace-nowrap self-start">
                                          <Award className="w-3 h-3 mr-1.5" />
                                          Sertifikat
                                        </Badge>
                                      )}
                                    </div>

                                    {/* Progress bar */}
                                    <div className="mt-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                      <div className="flex justify-between text-sm mb-2">
                                        <span className="text-slate-600 font-medium">Jarayon</span>
                                        <span className="font-bold text-indigo-600">{progress}%</span>
                                      </div>
                                      <Progress value={progress} className="h-2 bg-slate-200" />
                                      <div className="text-xs text-slate-500 mt-2 font-medium">
                                        Bajarildi: {completedCount} / {course.lessons?.length || 0} dars
                                      </div>
                                    </div>

                                    {/* Tugmalar */}
                                    <div className="flex flex-wrap gap-3 mt-4">
                                      <Button
                                        disabled
                                        className={`w-full sm:w-auto rounded-xl ${progress === 100 ? 'bg-slate-300' : 'bg-indigo-300'} text-white cursor-not-allowed hover:bg-slate-300`}
                                      >
                                        {progress === 100 ? 'Takrorlash' : 'Davom ettirish'}
                                        <ChevronRight className="w-4 h-4 ml-1" />
                                      </Button>

                                      {hasCertificate && (
                                        <Button disabled variant="outline" className="w-full sm:w-auto border-emerald-200 text-emerald-400 cursor-not-allowed rounded-xl">
                                          <Award className="w-4 h-4 mr-2" />
                                          Sertifikatni ko'rish
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Tez orada kurslari */}
                    {comingSoonCourses.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-amber-500" />
                          Tez orada qo'shiladigan kurslar
                        </h3>
                        <div className="grid grid-cols-1 gap-5">
                          {comingSoonCourses.map((course) => (
                            <div
                              key={course.id}
                              className="group bg-white border border-slate-100 rounded-2xl p-5 hover:border-amber-200 hover:shadow-lg transition-all duration-300"
                            >
                              <div className="flex flex-col sm:flex-row gap-5 items-start">
                                {/* Kurs Rasmi */}
                                <div className="relative shrink-0 overflow-hidden rounded-xl">
                                  <img
                                    src={course.image}
                                    alt={course.titleUz}
                                    className="w-full sm:w-32 h-32 sm:h-24 object-cover"
                                  />
                                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                    <div className="bg-amber-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      Tez orada
                                    </div>
                                  </div>
                                </div>

                                {/* Kurs Ma'lumotlari */}
                                <div className="flex-1 w-full min-w-0">
                                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                                    <div className="min-w-0">
                                      <h3 className="font-bold text-lg text-slate-900 line-clamp-1">{course.titleUz}</h3>
                                      <p className="text-sm text-slate-500 font-medium truncate">{course.instructor}</p>
                                    </div>
                                    <Badge className="bg-amber-50 text-amber-700 border-amber-200 whitespace-nowrap self-start">
                                      <Clock className="w-3 h-3 mr-1.5" />
                                      Tayyorlanmoqda
                                    </Badge>
                                  </div>

                                  <p className="text-sm text-slate-500 mt-2">
                                    Darslar hozirda tayyorlanmoqda. Tez orada qo'shiladi.
                                  </p>

                                  <div className="flex flex-wrap gap-3 mt-4">
                                    <Button
                                      disabled
                                      className="w-full sm:w-auto cursor-not-allowed bg-slate-200 text-slate-500 rounded-xl hover:bg-slate-200"
                                    >
                                      Kuting
                                      <Clock className="w-4 h-4 ml-1" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
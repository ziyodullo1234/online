import { Link } from 'react-router';
import { Header } from '../components/Header';
import { mockCourses } from '../data/mockData';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Clock, Star, Users, Youtube } from 'lucide-react';
import { useParams } from 'react-router';

export function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const course = mockCourses.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Kurs topilmadi</h1>
          <Link to="/courses" className="text-blue-600 hover:underline">
            Kurslarga qaytish
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Katta coming soon badge */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-yellow-100 rounded-full animate-ping opacity-75"></div>
            </div>
            <div className="relative bg-yellow-500 rounded-full w-28 h-28 flex items-center justify-center mx-auto">
              <Clock className="w-12 h-12 text-white animate-pulse" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {course.titleUz}
          </h1>
          
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-5 py-2.5 rounded-full text-sm font-semibold mb-6">
            <Clock className="w-4 h-4" />
            Tez orada darslar qo'shiladi
          </div>
          
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Ushbu kurs uchun darslar hozirda tayyorlanmoqda. 
            Tez orada barcha darslar qo'shiladi. Iltimos, kuzatib turing!
          </p>
          
          {course.playlistUrl && (
            <div className="mb-8">
              <a 
                href={course.playlistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
              >
                <Youtube className="w-5 h-5" />
                YouTube pleylistda ko'rish
              </a>
            </div>
          )}
          
          <Link to="/courses">
            <Button variant="outline" className="gap-2">
              Kurslarga qaytish
            </Button>
          </Link>

          {/* Course Info Card */}
          <Card className="mt-8 text-left">
            <CardContent className="p-6">
              <img 
                src={course.image} 
                alt={course.titleUz}
                className="w-full h-48 object-cover rounded-lg mb-6"
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Kategoriya</span>
                  <p className="font-medium">{course.category}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Daraja</span>
                  <p className="font-medium">
                    {course.level === 'beginner' ? 'Boshlang\'ich' :
                     course.level === 'intermediate' ? 'O\'rta' : 'Professional'}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Ustoz</span>
                  <p className="font-medium">{course.instructor}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Narx</span>
                  <p className="font-medium text-blue-600">{course.price.toLocaleString()} so'm</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Reyting</span>
                  <p className="font-medium flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {course.rating}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">O'quvchilar</span>
                  <p className="font-medium">{course.students.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
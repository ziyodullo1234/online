import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { mockCourses } from '../data/mockData';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Award, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import { toast } from 'sonner';

export function Certificate() {
  const { courseId } = useParams<{ courseId: string }>();
  const { user, issueCertificate } = useAuth();
  const navigate = useNavigate();

  const course = mockCourses.find(c => c.id === courseId);
  const progress = user?.progress[courseId!];

  useEffect(() => {
    if (user && courseId && progress && !progress.certificateIssued) {
      const completedAll = progress.completedLessons.length === course?.lessons.length;
      if (completedAll) {
        issueCertificate(courseId);
      }
    }
  }, []);

  if (!user) {
    navigate('/login');
    return null;
  }

  if (!course || !progress) {
    return <div>Sertifikat topilmadi</div>;
  }

  const completedAll = progress.completedLessons.length === course.lessons.length;

  if (!completedAll) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <Award className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Sertifikat hali tayyor emas</h2>
          <p className="text-gray-600 mb-4">
            Sertifikat olish uchun barcha darslarni yakunlang
          </p>
          <Button onClick={() => navigate(`/course/${courseId}`)}>
            Kursga qaytish
          </Button>
        </div>
      </div>
    );
  }

  const currentDate = new Date().toLocaleDateString('uz-UZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const downloadPDF = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    // Certificate border
    doc.setDrawColor(0, 102, 204);
    doc.setLineWidth(2);
    doc.rect(10, 10, 277, 190);

    // Title
    doc.setFontSize(40);
    doc.setTextColor(0, 102, 204);
    doc.text('SERTIFIKAT', 148.5, 40, { align: 'center' });

    // Subtitle
    doc.setFontSize(16);
    doc.setTextColor(100, 100, 100);
    doc.text('Muvaffaqiyatli yakunlash sertifikati', 148.5, 55, { align: 'center' });

    // Student name
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Ushbu sertifikat quyidagi shaxsga beriladi:', 148.5, 80, { align: 'center' });
    
    doc.setFontSize(28);
    doc.setTextColor(0, 102, 204);
    doc.text(user.name, 148.5, 100, { align: 'center' });

    // Course info
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Quyidagi kursni muvaffaqiyatli yakunlaganligi uchun:', 148.5, 120, { align: 'center' });
    
    doc.setFontSize(20);
    doc.setTextColor(0, 102, 204);
    doc.text(course.titleUz, 148.5, 135, { align: 'center' });

    // Instructor
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`O'qituvchi: ${course.instructor}`, 148.5, 150, { align: 'center' });

    // Date
    doc.text(`Sana: ${currentDate}`, 148.5, 165, { align: 'center' });

    // Platform name
    doc.setFontSize(16);
    doc.setTextColor(0, 102, 204);
    doc.text('EduPlatform', 148.5, 185, { align: 'center' });

    doc.save(`${course.titleUz}_Sertifikat.pdf`);
    toast.success('Sertifikat yuklab olindi!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Award className="w-20 h-20 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-2">Tabriklaymiz! 🎉</h1>
            <p className="text-gray-600">Siz kursni muvaffaqiyatli yakunladingiz</p>
          </div>

          <Card className="border-4 border-blue-600">
            <CardContent className="p-12">
              <div className="text-center space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-blue-600 mb-2">SERTIFIKAT</h2>
                  <p className="text-gray-600">Muvaffaqiyatli yakunlash sertifikati</p>
                </div>

                <div className="py-8">
                  <p className="text-lg mb-4">Ushbu sertifikat quyidagi shaxsga beriladi:</p>
                  <p className="text-4xl font-bold text-blue-600 mb-8">{user.name}</p>
                  <p className="text-lg mb-4">Quyidagi kursni muvaffaqiyatli yakunlaganligi uchun:</p>
                  <p className="text-2xl font-bold mb-6">{course.titleUz}</p>
                  <p className="text-gray-600">O'qituvchi: {course.instructor}</p>
                </div>

                <div className="flex items-center justify-between pt-8 border-t">
                  <div className="text-left">
                    <p className="text-sm text-gray-600">Sana</p>
                    <p className="font-medium">{currentDate}</p>
                  </div>
                  <div className="text-center">
                    <Award className="w-16 h-16 text-blue-600 mx-auto" />
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Platform</p>
                    <p className="font-medium text-blue-600">EduPlatform</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4 justify-center mt-8">
            <Button onClick={downloadPDF} size="lg">
              <Download className="w-4 h-4 mr-2" />
              PDF yuklash
            </Button>
            <Button variant="outline" onClick={() => navigate('/profile')} size="lg">
              Profilga o'tish
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

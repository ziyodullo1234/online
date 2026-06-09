import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { mockCourses } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import { Progress } from '../components/ui/progress';
import { CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

export function TestPage() {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const { user, updateProgress } = useAuth();
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const course = mockCourses.find(c => c.id === courseId);
  const lesson = course?.lessons.find(l => l.id === lessonId);
  const test = lesson?.test;

  if (!course || !lesson || !test) {
    return <div>Test topilmadi</div>;
  }

  const questions = test.questions;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setAnswers({ ...answers, [questionIndex]: answerIndex });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / questions.length) * 100);
    
    if (user) {
      updateProgress(course.id, lessonId!, score);
    }

    setShowResults(true);

    if (score >= 70) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      toast.success(`Tabriklaymiz! ${score}% ball`);
    } else {
      toast.error(`Test yakunlandi. ${score}% ball`);
    }
  };

  if (showResults) {
    const correctCount = questions.filter((q, i) => answers[i] === q.correctAnswer).length;
    const score = Math.round((correctCount / questions.length) * 100);
    const passed = score >= 70;

    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Test Natijalari</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className={`text-6xl font-bold mb-4 ${passed ? 'text-green-600' : 'text-red-600'}`}>
                  {score}%
                </div>
                <p className="text-xl mb-2">
                  {correctCount} / {questions.length} to'g'ri javob
                </p>
                <p className={`text-lg ${passed ? 'text-green-600' : 'text-red-600'}`}>
                  {passed ? '✓ Test muvaffaqiyatli topshirildi!' : '✗ Test topshirilmadi. Qaytadan urinib ko\'ring.'}
                </p>
              </div>

              <div className="space-y-4">
                {questions.map((question, index) => {
                  const userAnswer = answers[index];
                  const isCorrect = userAnswer === question.correctAnswer;

                  return (
                    <div key={question.id} className="border rounded-lg p-4">
                      <div className="flex items-start gap-2 mb-3">
                        {isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium mb-2">{index + 1}. {question.questionUz}</p>
                          <p className="text-sm text-gray-600">
                            Sizning javobingiz: <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                              {question.optionsUz[userAnswer]}
                            </span>
                          </p>
                          {!isCorrect && (
                            <p className="text-sm text-green-600">
                              To'g'ri javob: {question.optionsUz[question.correctAnswer]}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => navigate(`/course/${courseId}`)}
                >
                  Kursga qaytish
                </Button>
                {!passed && (
                  <Button 
                    className="flex-1"
                    onClick={() => {
                      setAnswers({});
                      setCurrentQuestion(0);
                      setShowResults(false);
                    }}
                  >
                    Qayta topshirish
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card>
          <CardHeader>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{lesson.titleUz}</span>
                <span>Savol {currentQuestion + 1} / {questions.length}</span>
              </div>
              <Progress value={progress} />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">
                {currentQuestion + 1}. {currentQ.questionUz}
              </h3>

              <RadioGroup
                value={answers[currentQuestion]?.toString()}
                onValueChange={(value) => handleAnswerSelect(currentQuestion, parseInt(value))}
              >
                {currentQ.optionsUz.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                Orqaga
              </Button>
              <Button
                onClick={handleNext}
                disabled={answers[currentQuestion] === undefined}
              >
                {currentQuestion === questions.length - 1 ? 'Yakunlash' : 'Keyingi'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

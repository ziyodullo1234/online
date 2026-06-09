import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Course } from '../data/mockData';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Star, User } from 'lucide-react';
import { toast } from 'sonner';

interface ReviewSectionProps {
  course: Course;
}

export function ReviewSection({ course }: ReviewSectionProps) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState(course.reviews);

  const handleSubmitReview = () => {
    if (!user) {
      toast.error('Sharh qoldirish uchun tizimga kiring');
      return;
    }

    if (rating === 0) {
      toast.error('Iltimos reyting tanlang');
      return;
    }

    if (!comment.trim()) {
      toast.error('Iltimos sharh yozing');
      return;
    }

    const newReview = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews([newReview, ...reviews]);
    setRating(0);
    setComment('');
    toast.success('Sharhingiz qo\'shildi!');
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : course.rating.toFixed(1);

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        {/* Rating Summary */}
        <div className="flex items-center gap-8 pb-6 border-b">
          <div className="text-center">
            <div className="text-5xl font-bold text-blue-600 mb-2">{averageRating}</div>
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(parseFloat(averageRating))
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-gray-600">{reviews.length} sharh</div>
          </div>

          <div className="flex-1">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = reviews.filter(r => r.rating === star).length;
              const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
              
              return (
                <div key={star} className="flex items-center gap-2 mb-2">
                  <span className="text-sm w-8">{star} ⭐</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-yellow-400"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Add Review */}
        {user && (
          <div className="space-y-4 pb-6 border-b">
            <h3 className="font-semibold">Sharh qoldiring</h3>
            
            <div>
              <p className="text-sm text-gray-600 mb-2">Baholang:</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-8 h-8 cursor-pointer transition ${
                      star <= (hoverRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300 hover:text-yellow-400'
                    }`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  />
                ))}
              </div>
            </div>

            <div>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Kurs haqida fikringizni yozing..."
                rows={4}
              />
            </div>

            <Button onClick={handleSubmitReview}>
              Sharh qo'shish
            </Button>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-4">
          <h3 className="font-semibold">Sharhlar</h3>
          
          {reviews.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Hali sharh yo'q</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{review.userName}</span>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <div className="flex gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

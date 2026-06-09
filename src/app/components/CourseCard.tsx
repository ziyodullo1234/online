import { Link } from 'react-router';
import { Course } from '../data/mockData';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Star, Clock, BarChart } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m';
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'IT':
        return 'bg-blue-100 text-blue-800';
      case 'Excel':
        return 'bg-green-100 text-green-800';
      case 'English':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'Boshlang\'ich';
      case 'intermediate':
        return 'O\'rta';
      case 'pro':
        return 'Professional';
      default:
        return level;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={course.image}
          alt={course.titleUz}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <Badge className={getCategoryColor(course.category)}>
            {course.category}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4 flex-1">
        <h3 className="text-xl font-semibold mb-2 line-clamp-2">{course.titleUz}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.descriptionUz}</p>
        
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{course.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <BarChart className="w-4 h-4" />
            <span>{getLevelText(course.level)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{course.lessons.length} dars</span>
          </div>
        </div>

        <p className="text-sm text-gray-600">Ustoz: {course.instructor}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <span className="text-2xl font-bold text-blue-600">{formatPrice(course.price)}</span>
        <Link to={`/course/${course.id}`}>
          <Button>Ko'rish</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

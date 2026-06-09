// mockData.ts
export interface Lesson {
  id: string;
  titleUz: string;
  titleRu?: string;
  duration: string;
  videoUrl: string;
  test?: {
    questions: Array<{
      question: string;
      options: string[];
      correctAnswer: number;
    }>;
  };
}

export interface Course {
  id: string;
  title: string;
  titleUz: string;
  description: string;
  descriptionUz: string;
  category: 'IT' | 'Excel' | 'English';
  level: 'beginner' | 'intermediate' | 'pro';
  price: number;
  duration: string;
  lessons: Lesson[];
  rating: number;
  students: number;
  image: string;
  instructor: string;
  isFeatured: boolean;
  youtubeUrl?: string;
  playlistUrl?: string;
}

export const mockCourses: Course[] = [
  // ========== IT KURSI - DARSLARI BOR ==========
  {
    id: '1',
    title: 'JavaScript asoslari',
    titleUz: 'JavaScript asoslari',
    description: 'JavaScript dasturlash tilini noldan boshlab o\'rganing',
    descriptionUz: 'JavaScript dasturlash tilini noldan boshlab o\'rganing',
    category: 'IT',
    level: 'beginner',
    price: 299000,
    duration: '12 soat',
    rating: 4.8,
    students: 1250,
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=300&fit=crop',
    instructor: 'John Doe',
    isFeatured: true,
    youtubeUrl: 'https://www.youtube.com/embed/PkZNo7MFNFg',
    lessons: [
      {
        id: 'js-1',
        titleUz: 'Kirish. JavaScript nima?',
        duration: '15:00',
        videoUrl: 'https://www.youtube.com/embed/PkZNo7MFNFg'
      },
      {
        id: 'js-2',
        titleUz: 'O\'zgaruvchilar',
        duration: '25:00',
        videoUrl: 'https://www.youtube.com/embed/PkZNo7MFNFg'
      }
    ]
  },

  // ========== REACT KURSI - DARSLARI YO'Q ==========
  {
    id: '2',
    title: 'React.js full course',
    titleUz: 'React.js full kurs',
    description: 'React bilan zamonaviy web ilovalar yaratish',
    descriptionUz: 'React bilan zamonaviy web ilovalar yaratish',
    category: 'IT',
    level: 'intermediate',
    price: 399000,
    duration: '18 soat',
    rating: 4.9,
    students: 890,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
    instructor: 'Sarah Johnson',
    isFeatured: true,
    youtubeUrl: 'https://www.youtube.com/embed/w7ejDZ8SWv8',
    playlistUrl: 'https://youtube.com/playlist?list=PLnQvfeVegJcKz8K9m5n5g5k9m5n5g7',
    lessons: [] // Darslar yo'q
  },

  // ========== PYTHON KURSI - DARSLARI YO'Q ==========
  {
    id: '3',
    title: 'Python dasturlash',
    titleUz: 'Python dasturlash',
    description: 'Python bilan backend va data science asoslari',
    descriptionUz: 'Python bilan backend va data science asoslari',
    category: 'IT',
    level: 'beginner',
    price: 349000,
    duration: '20 soat',
    rating: 4.7,
    students: 2100,
    image: 'https://images.unsplash.com/photo-1526379095098-d4fd0be29fe3?w=400&h=300&fit=crop',
    instructor: 'Mike Ross',
    isFeatured: true,
    youtubeUrl: 'https://www.youtube.com/embed/kqtD5dpn9C8',
    playlistUrl: 'https://youtube.com/playlist?list=PLnQvfeVegJcJ5g5x8k9m5n5g5k9m5n6',
    lessons: [] // Darslar yo'q
  },

  // ========== EXCEL KURSI - DARSLARI BOR ==========
  {
    id: '6',
    title: 'Excel dan boshlang\'ich',
    titleUz: 'Excel dan boshlang\'ich',
    description: 'Excel ni noldan boshlab o\'rganing',
    descriptionUz: 'Excel ni noldan boshlab o\'rganing',
    category: 'Excel',
    level: 'beginner',
    price: 199000,
    duration: '8 soat',
    rating: 4.7,
    students: 3450,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    instructor: 'Excel Master',
    isFeatured: true,
    youtubeUrl: 'https://www.youtube.com/embed/ITkIh3V_8wY',
    lessons: [
      {
        id: 'excel-1',
        titleUz: 'Excel interfeysi',
        duration: '15:00',
        videoUrl: 'https://www.youtube.com/embed/ITkIh3V_8wY'
      }
    ]
  },

  // ========== EXCEL VBA - DARSLARI YO'Q ==========
  {
    id: '7',
    title: 'Excel VBA dasturlash',
    titleUz: 'Excel VBA dasturlash',
    description: 'Excel VBA bilan avtomatlashtirish',
    descriptionUz: 'Excel VBA bilan avtomatlashtirish',
    category: 'Excel',
    level: 'intermediate',
    price: 299000,
    duration: '12 soat',
    rating: 4.8,
    students: 890,
    image: 'https://images.unsplash.com/photo-1616499370260-485b3e5ed1da?w=400&h=300&fit=crop',
    instructor: 'VBA Pro',
    isFeatured: true,
    playlistUrl: 'https://youtube.com/playlist?list=PLnQvfeVegJcL5g5x8k9m5n5g5k9mExcel2',
    lessons: [] // Darslar yo'q
  },

  // ========== INGLIZ TILI KURSI - DARSLARI BOR ==========
  {
    id: '10',
    title: 'Ingliz tili boshlang\'ich',
    titleUz: 'Ingliz tili boshlang\'ich',
    description: 'Ingliz tilini noldan boshlab o\'rganing',
    descriptionUz: 'Ingliz tilini noldan boshlab o\'rganing',
    category: 'English',
    level: 'beginner',
    price: 249000,
    duration: '30 soat',
    rating: 4.8,
    students: 2800,
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=300&fit=crop',
    instructor: 'Jennifer Smith',
    isFeatured: true,
    youtubeUrl: 'https://www.youtube.com/embed/ZXW1gOGuDxo',
    lessons: [
      {
        id: 'eng-1',
        titleUz: 'Alphabet',
        duration: '20:00',
        videoUrl: 'https://www.youtube.com/embed/ZXW1gOGuDxo'
      }
    ]
  },

  // ========== IELTS KURSI - DARSLARI YO'Q ==========
  {
    id: '11',
    title: 'IELTS 7+ preparation',
    titleUz: 'IELTS 7+ tayyorgarlik',
    description: 'IELTS imtihoniga to\'liq tayyorgarlik',
    descriptionUz: 'IELTS imtihoniga to\'liq tayyorgarlik',
    category: 'English',
    level: 'intermediate',
    price: 399000,
    duration: '40 soat',
    rating: 4.9,
    students: 1560,
    image: 'https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?w=400&h=300&fit=crop',
    instructor: 'IELTS Expert',
    isFeatured: true,
    playlistUrl: 'https://youtube.com/playlist?list=PLnQvfeVegJcL5g5x8k9m5n5g5k9mEnglish2',
    lessons: [] // Darslar yo'q
  }
];
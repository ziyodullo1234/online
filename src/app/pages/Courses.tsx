import { useState } from 'react';
import { Header } from '../components/Header';
import { mockCourses } from '../data/mockData';
import { Card, CardContent } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Slider } from '../components/ui/slider';
import { Button } from '../components/ui/button';
import { Search, Filter, X, BookOpen, Code, FileSpreadsheet, Languages, Grid, List, Clock, Star, Users, Youtube } from 'lucide-react';

export function Courses() {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(500000);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'IT': return <Code className="w-4 h-4" />;
      case 'Excel': return <FileSpreadsheet className="w-4 h-4" />;
      case 'English': return <Languages className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'IT': return 'bg-blue-100 text-blue-700';
      case 'Excel': return 'bg-green-100 text-green-700';
      case 'English': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredCourses = mockCourses.filter(course => {
    if (categoryFilter !== 'all' && course.category !== categoryFilter) return false;
    if (levelFilter !== 'all' && course.level !== levelFilter) return false;
    if (course.price > maxPrice) return false;
    if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !course.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const clearFilters = () => {
    setCategoryFilter('all');
    setLevelFilter('all');
    setMaxPrice(500000);
    setSearchQuery('');
  };

  const hasActiveFilters = categoryFilter !== 'all' || levelFilter !== 'all' || maxPrice !== 500000 || searchQuery !== '';

  const categories = [
    { id: 'all', name: 'Barchasi', icon: BookOpen, count: mockCourses.length },
    { id: 'IT', name: 'IT Kurslar', icon: Code, count: mockCourses.filter(c => c.category === 'IT').length },
    { id: 'Excel', name: 'Excel', icon: FileSpreadsheet, count: mockCourses.filter(c => c.category === 'Excel').length },
    { id: 'English', name: 'Ingliz tili', icon: Languages, count: mockCourses.filter(c => c.category === 'English').length },
  ];

  const levels = [
    { id: 'all', name: 'Barcha darajalar' },
    { id: 'beginner', name: 'Boshlang\'ich' },
    { id: 'intermediate', name: 'O\'rta' },
    { id: 'pro', name: 'Professional' },
  ];

  const getLevelBadge = (level: string) => {
    switch(level) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-blue-100 text-blue-700';
      case 'pro': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getLevelName = (level: string) => {
    switch(level) {
      case 'beginner': return 'Boshlang\'ich';
      case 'intermediate': return 'O\'rta';
      case 'pro': return 'Professional';
      default: return level;
    }
  };

  // Hech qanday navigatsiya qilmaydigan funksiya
  const handleCardClick = () => {
    // Hech narsa qilmaydi - kurs ochilmaydi
    return;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">
              Kurslar katalogi
            </h1>
            <p className="text-lg text-gray-500">
              {filteredCourses.length} ta kursdan sizga eng mosini tanlang
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Qidirish..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300 text-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-gray-400" />
                      <h3 className="font-medium text-gray-900">Filterlar</h3>
                    </div>
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        Tozalash
                      </button>
                    )}
                  </div>

                  {/* Categories */}
                  <div className="mb-8">
                    <Label className="text-sm font-medium text-gray-700 mb-3 block">Kategoriyalar</Label>
                    <div className="space-y-1">
                      {categories.map((category) => {
                        const Icon = category.icon;
                        const isActive = categoryFilter === category.id;
                        return (
                          <button
                            key={category.id}
                            onClick={() => setCategoryFilter(category.id)}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all ${
                              isActive
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                              <span className="text-sm">{category.name}</span>
                            </div>
                            <span className={`text-xs ${isActive ? 'text-gray-300' : 'text-gray-400'}`}>
                              {category.count}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Levels */}
                  <div className="mb-8">
                    <Label className="text-sm font-medium text-gray-700 mb-3 block">Daraja</Label>
                    <div className="space-y-1">
                      {levels.map((level) => (
                        <button
                          key={level.id}
                          onClick={() => setLevelFilter(level.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                            levelFilter === level.id
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <span className="text-sm">{level.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <div className="flex justify-between mb-3">
                      <Label className="text-sm font-medium text-gray-700">Narx</Label>
                      <span className="text-sm font-medium text-gray-900">
                        {new Intl.NumberFormat('uz-UZ').format(maxPrice)} so'm
                      </span>
                    </div>
                    <Slider
                      value={[maxPrice]}
                      onValueChange={(value) => setMaxPrice(value[0])}
                      max={500000}
                      min={0}
                      step={25000}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>0 so'm</span>
                      <span>250,000 so'm</span>
                      <span>500,000 so'm</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Courses Area */}
          <div className="lg:col-span-3">
            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-6">
                {categoryFilter !== 'all' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm">
                    {getCategoryIcon(categoryFilter)}
                    {categories.find(c => c.id === categoryFilter)?.name}
                    <button onClick={() => setCategoryFilter('all')} className="ml-1 hover:text-gray-900">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {levelFilter !== 'all' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm">
                    {levels.find(l => l.id === levelFilter)?.name}
                    <button onClick={() => setLevelFilter('all')} className="ml-1 hover:text-gray-900">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {maxPrice !== 500000 && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm">
                    {new Intl.NumberFormat('uz-UZ').format(maxPrice)} so'm gacha
                    <button onClick={() => setMaxPrice(500000)} className="ml-1 hover:text-gray-900">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Barcha kurslar
                </h2>
                <p className="text-sm text-gray-500">
                  {filteredCourses.length} ta kurs
                </p>
              </div>
              
              {/* View Toggle */}
              <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded transition-all ${
                    viewMode === 'grid' ? 'bg-gray-900 text-white' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded transition-all ${
                    viewMode === 'list' ? 'bg-gray-900 text-white' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Courses Grid/List - Link olib tashlandi, faqat div */}
            {filteredCourses.length > 0 ? (
              <div className={
                viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6"
                  : "space-y-4"
              }>
                {filteredCourses.map((course) => {
                  return (
                    <div key={course.id} onClick={handleCardClick} className="cursor-default">
                      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                        <div className="relative overflow-hidden h-48">
                          <img 
                            src={course.image} 
                            alt={course.titleUz}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          
                          {/* Category Badge */}
                          <div className="absolute top-3 left-3">
                            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getCategoryColor(course.category)}`}>
                              {course.category}
                            </span>
                          </div>
                          
                          {/* Level Badge */}
                          <div className="absolute bottom-3 left-3">
                            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getLevelBadge(course.level)}`}>
                              {getLevelName(course.level)}
                            </span>
                          </div>

                          {/* COMING SOON OVERLAY */}
                          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                            <div className="text-center">
                              <div className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 mb-2">
                                <Clock className="w-4 h-4 animate-pulse" />
                                Tez orada
                              </div>
                              <p className="text-white text-xs">Darslar tayyorlanmoqda</p>
                            </div>
                          </div>
                        </div>
                        
                        <CardContent className="p-5">
                          <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
                            {course.titleUz}
                          </h3>
                          <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                            {course.descriptionUz}
                          </p>
                          
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                <span>{course.rating}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-3.5 h-3.5" />
                                <span>{course.students.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{course.duration}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            <div>
                              <span className="font-bold text-lg text-gray-900">
                                {course.price.toLocaleString()} so'm
                              </span>
                              <span className="text-xs text-yellow-600 ml-2">(Tez orada)</span>
                            </div>
                            <Button size="sm" className="bg-gray-900 hover:bg-gray-800 opacity-50 cursor-default" onClick={(e) => e.preventDefault()}>
                              Ko'rish
                            </Button>
                          </div>

                          {/* YouTube Playlist Link */}
                          {course.playlistUrl && (
                            <div className="mt-3 pt-2">
                              <a 
                                href={course.playlistUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-600"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Youtube className="w-3.5 h-3.5" />
                                <span>YouTube pleylistni ko'rish</span>
                              </a>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">Kurs topilmadi</h3>
                <p className="text-gray-500 text-sm mb-4">Filterlarni o'zgartirib ko'ring</p>
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-600 hover:text-gray-900 underline"
                >
                  Barcha filterlarni tozalash
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
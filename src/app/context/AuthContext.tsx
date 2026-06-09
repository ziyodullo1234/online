import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProgress } from '../data/mockData';

interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  enrolledCourses: string[];
  progress: { [courseId: string]: UserProgress };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, phone: string, password: string) => boolean;
  logout: () => void;
  enrollCourse: (courseId: string) => void;
  updateProgress: (courseId: string, lessonId: string, testScore?: number) => void;
  issueCertificate: (courseId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('lms_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    // Mock login - in real app, this would call backend
    const storedUsers = localStorage.getItem('lms_users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('lms_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, phone: string, password: string): boolean => {
    const storedUsers = localStorage.getItem('lms_users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    
    if (users.find((u: any) => u.email === email)) {
      return false; // User already exists
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      password,
      enrolledCourses: [],
      progress: {}
    };

    users.push(newUser);
    localStorage.setItem('lms_users', JSON.stringify(users));

    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('lms_user', JSON.stringify(userWithoutPassword));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lms_user');
  };

  const enrollCourse = (courseId: string) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      enrolledCourses: [...user.enrolledCourses, courseId],
      progress: {
        ...user.progress,
        [courseId]: {
          courseId,
          completedLessons: [],
          testScores: {},
          certificateIssued: false
        }
      }
    };

    setUser(updatedUser);
    localStorage.setItem('lms_user', JSON.stringify(updatedUser));

    // Update in users array
    const storedUsers = localStorage.getItem('lms_users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    const userIndex = users.findIndex((u: any) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updatedUser };
      localStorage.setItem('lms_users', JSON.stringify(users));
    }
  };

  const updateProgress = (courseId: string, lessonId: string, testScore?: number) => {
    if (!user) return;

    const courseProgress = user.progress[courseId] || {
      courseId,
      completedLessons: [],
      testScores: {},
      certificateIssued: false
    };

    const updatedProgress = {
      ...courseProgress,
      completedLessons: courseProgress.completedLessons.includes(lessonId)
        ? courseProgress.completedLessons
        : [...courseProgress.completedLessons, lessonId],
      testScores: testScore !== undefined
        ? { ...courseProgress.testScores, [lessonId]: testScore }
        : courseProgress.testScores
    };

    const updatedUser = {
      ...user,
      progress: {
        ...user.progress,
        [courseId]: updatedProgress
      }
    };

    setUser(updatedUser);
    localStorage.setItem('lms_user', JSON.stringify(updatedUser));
  };

  const issueCertificate = (courseId: string) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      progress: {
        ...user.progress,
        [courseId]: {
          ...user.progress[courseId],
          certificateIssued: true
        }
      }
    };

    setUser(updatedUser);
    localStorage.setItem('lms_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, enrollCourse, updateProgress, issueCertificate }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

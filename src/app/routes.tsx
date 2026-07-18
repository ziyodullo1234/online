import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Profile } from "./pages/Profile";
import { Courses } from "./pages/Courses";
import { CourseDetail } from "./pages/CourseDetail";
import { TestPage } from "./pages/TestPage";
import { Payment } from "./pages/Payment";
import { Certificate } from "./pages/Certificate";
import { Games } from "./pages/Games"; // Qo'shildi
import { ForgotPassword } from './pages/ForgotPassword';


export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/profile",
    Component: Profile,
  },
  {
    path: "/courses",
    Component: Courses,
  },
  {
  path: '/forgot-password',
  element: <ForgotPassword />,
},
  {
    path: "/course/:courseId",
    Component: CourseDetail,
  },
  {
    path: "/test/:courseId/:lessonId",
    Component: TestPage,
  },
  {
    path: "/payment/:courseId",
    Component: Payment,
  },
  {
    path: "/certificate/:courseId",
    Component: Certificate,
  },
  {
    path: "/games",  // Qo'shildi
    Component: Games,
  },
]);
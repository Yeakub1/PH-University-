import { Router } from "express";
import { UserRoute } from './../modules/User/user.route';
import { studentRoute } from "../modules/student/student.route";
import { AcadmicSemesterRoute } from "../modules/acadmicSemester/acadmicSemester.route";
import { AcadmicFacultyRoute } from "../modules/acadmicFaculty/acadmicFaculty.route";
import { AcadmicDepartmentRoute } from "../modules/acadmicDepartment/acadmicDepartment.route";
import { AdminRoutes } from "../modules/Admin/admin.route";
import { FacultyRoutes } from "../modules/Faculty/faculty.route";

const router = Router();

const moduleRoute = [
  {
    path: '/users',
    route: UserRoute,
  },
  {
    path: '/students',
    route: studentRoute,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/acadmic-semesters',
    route: AcadmicSemesterRoute,
  },
  {
    path: '/acadmic-faculty',
    route: AcadmicFacultyRoute,
  },
  {
    path: '/acadmic-department',
    route: AcadmicDepartmentRoute,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
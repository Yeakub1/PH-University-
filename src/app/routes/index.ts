import { Router } from "express";
import { UserRoute } from './../modules/User/user.route';
import { studentRoute } from "../modules/student/student.route";
import { AcadmicSemesterRoute } from "../modules/acadmicSemester/acadmicSemester.route";

const router = Router();

const moduleRoute = [
    {
        path: '/users',
        route: UserRoute
    },
    {
        path: '/students',
        route: studentRoute
    },
    {
        path: '/acadmic-semesters',
        route: AcadmicSemesterRoute
    },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
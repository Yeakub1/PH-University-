import { Router } from "express";
import { UserRoute } from './../modules/User/user.route';
import { studentRoute } from "../modules/student/student.route";

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
]

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
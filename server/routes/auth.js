import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);

export default router;


// {
//     "firstName": "Clement",
//     "lastName": "Batut",
//     "email": "clement@cyclingnow.now",
//     "password": "$2b$10$dPPu5fnotlJh254sLwdUbODxEMDgRHmamMDp6NRgaHWnS4IeEwUKm",
//     "picturePath": "",
//     "friends": [],
//     "viewedProfile": 4018,
//     "impressions": 212,
//     "_id": "6446c3831c16ce0e0505a81f",
//     "createdAt": "2023-04-24T17:59:31.432Z",
//     "updatedAt": "2023-04-24T17:59:31.432Z",
//     "__v": 0
// }
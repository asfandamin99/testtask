import { Router } from "express";
import {
    Add_Car,
    Get_ALL_Cars_Paginated,
    Update_Car,
    Del_Car
} from "../controllers/cars.js";
import { authentication } from "../middleware/authentication.js";

const router = Router();

router.post("/add", authentication,  Add_Car);
router.post("/getall", authentication, Get_ALL_Cars_Paginated);
router.post("/delete", authentication, Del_Car);
router.patch("/update", authentication, Update_Car);

export default router;

import { Router } from "express";
import {
    Add_Category,
    Get_ALL_Category_Paginated,
    Del_Category,
    Update_Category
} from "../controllers/categories.js";
import { authentication } from "../middleware/authentication.js";

const router = Router();

router.post("/add", authentication,  Add_Category);
router.post("/getall", authentication, Get_ALL_Category_Paginated);
router.post("/delete", authentication, Del_Category);
router.patch("/update", authentication, Update_Category);

export default router;

import { Router } from "express";
import { createProducts, deleteProduct, getAllProducts, getASingleProduct, getProductsByCategory,searchProducts, updateProducts } from "../controllers/products.js";
import { verifyAuth, Roles } from "../middlewares/verifyAuth.js";

const router = Router()
router.post("/create", verifyAuth(Roles.Admin), createProducts)

router.get("/:categoryName", getProductsByCategory)

router.get("/single/:title", getASingleProduct)
router.get("/get/search",searchProducts)
router.get("/", getAllProducts)


router.patch("/update/:id", verifyAuth(Roles.Admin), updateProducts)
router.delete("/delete/:id", verifyAuth(Roles.Admin), deleteProduct)

export default router
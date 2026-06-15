import express from "express";
import { addproduct, getAllProduct, updateProduct, bulkCreate, deleteProduct } from "../controller/productController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.get("/products", getAllProduct)
router.put("/products/:id", updateProduct)
router.delete("/products/:id", deleteProduct)
router.post("/products/bulk", bulkCreate)

router.post("/products", upload.single("image"), addproduct)

export default router
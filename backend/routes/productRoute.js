import express from "express";
import { addproduct, getAllProduct , updateProduct ,bulkCreate, deleteProduct} from "../controller/productController.js";

const router = express.Router();

router.get("/products", getAllProduct)
router.post("/products", addproduct)
router.put("/products/:id",updateProduct)
router.delete("/products/:id",deleteProduct)
router.post("/products/bulk",bulkCreate)

export default router
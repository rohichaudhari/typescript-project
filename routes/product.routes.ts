import express from "express";
const productRoutes = express.Router();
import { upload } from "../helpers/imageUpload";
import {
    addNewProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
} from '../controller/product.controller';

productRoutes.post('/addproduct', upload.single('productImage'), addNewProduct);
productRoutes.get('/', getAllProducts);
productRoutes.put('/update-product', upload.single('productImage'), updateProduct);
productRoutes.delete('/delete-product', deleteProduct);

export default productRoutes;
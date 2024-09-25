import express from "express";
import { verifyToken } from "../helpers/verifyToken";
const orderRoutes = express.Router();
import {
  addNewOrder,
  getAllOrders,
  deleteOrder,
} from "../controller/order.controller";

orderRoutes.post("/add-order", verifyToken, addNewOrder);
orderRoutes.get("/get-order", verifyToken, getAllOrders);
orderRoutes.delete('/delete-order', deleteOrder);

export default orderRoutes;

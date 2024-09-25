import { Request, Response } from "express";
import { IOrder } from "../interface/IOrder";
import { IUser } from "../interface/IUser";
import CartServices from "../services/cart.service";
const cartService = new CartServices();
import OrderServices from "../services/order.service";
import { Icart } from "../interface/Icart";
import { ObjectId } from "mongoose";
const orderService = new OrderServices();

// Global Variable
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}


// New Order Create
export const addNewOrder = async (req: Request, res: Response) => {
  try {
    let cartProducts = (await cartService.getMyCarts(
      req.query,
      req.user?._id
    )) as Icart[];

    if (cartProducts.length === 0) {
      return res.json({ message: "Your Cart is Empty." });
    }
    // console.log(cartProducts);
    let orderItems = cartProducts.map((item: any) => ({
      product: item.cartItem._id,
      quantity: item.quantity,
      price: item.cartItem?.price,
    }));
    // console.log(orderItems);

    let totalPrice = orderItems.reduce(
      (total, item) => total + Number(item.price) * Number(item.quantity),
      0
    );
    // console.log(totalPrice);
    const newOrder = (await orderService.addNewOrder({
      user: req.user?._id,
      items: orderItems,
      totalAmount: totalPrice,
    })) as IOrder;

    await cartService.updateMany(req.user?._id as ObjectId, { isDelete: true });
    res
      .status(201)
      .json({ order: newOrder, message: "New Order Sucessfully Placed." });
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal Server Error" });
  }
};


// Get All Order also filtering
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await orderService.getAllOrder(req.query, req.user?._id);
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal Server Error" });
  }
};


// Delete Order
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const order = await orderService.getOrderByid(req.query.orderId as any);
    if (!order) {
      return res.json({ message: "Order is not found" });
    }

    const deleteOrder = await orderService.updateOrder(
      req.query.orderId as any,
      {
        isDelete: true,
      }
    );
    res.json({ message: "Order Delete succesfully." });
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal Server Error" });
  }
};

import Order from "../model/order.model";
import { IOrder } from "../interface/IOrder";
import mongoose, { ObjectId } from "mongoose";

export default class OrderServices {
  // Add New Order
  async addNewOrder(body: object) {
    try {
      return await Order.create(body);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  // Get Order
  async getCart(body: object) {
    try {
      return await Order.findOne(body);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  // Get order By Id
  async getOrderByid(id: ObjectId) {
    try {
      return await Order.findById(id);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  // update Order
  async updateOrder(id: ObjectId, body: object) {
    try {
      return await Order.findByIdAndUpdate(id, { $set: body }, { new: true });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  // Get All Order
  async getAllOrder(query: any, userId: any) {
    try {
      // Pagination
      let pageNo: number = Number(query.pageNo || 1);
      let perPage: number = Number(query.perPage || 10);
      let skip: number = (pageNo - 1) * perPage;

      let myOrder = query.me && query.me === true ? [
        {
          $match: {user: userId}
        }
      ] : [];

      let orderId = query.orderId && query.orderId !== "" ? [
        {
          $match: {_id: new mongoose.Types.ObjectId(query.orderId)}
        }
      ] : [];

      let find = [
        { $match: { isDelete: false } },
        ...myOrder,
        ...orderId,
        { $skip: skip },
        { $limit: perPage },
      ];
      let results: IOrder[] = await Order.aggregate(find);
      const totalPages: number = Math.ceil(results.length / perPage);
      return {
        totalCounts: results.length,
        totalPages: totalPages,
        currentPage: pageNo,
        result: results,
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

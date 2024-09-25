import { ObjectId } from "mongoose";

export interface IOrder {
  _id?: ObjectId;
  user?: ObjectId;
  items?: ObjectId[];
  totalAmount?: number;
  isDelete?: Boolean;
}

import { ObjectId } from "mongoose";
export interface Icart{
    _id?:ObjectId,
    user?:ObjectId,
    cartItem?:ObjectId,
    quantity?:number,
    isDelete?:boolean
}
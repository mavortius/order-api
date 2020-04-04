import { Document, model, Model, Schema } from 'mongoose'

export enum OrderStatus {
  Placed = 'PLACED',
  Approved = 'APPROVED',
  Delivered = 'DELIVERED',
}

export interface Order extends Document {
  userId: Number
  quantity: Number
  shipDate: Date
  status: OrderStatus
  complete: Boolean
}

export const OrderSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  quantity: Number,
  shipDate: Date,
  status: { type: String, enum: [ 'PLACED', 'APPROVED', 'DELIVERED' ] },
  complete: Boolean,
})

export const OrderModel: Model<Order> = model<Order>('Order', OrderSchema)

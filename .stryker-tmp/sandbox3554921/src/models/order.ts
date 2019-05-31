import { OrderStatus } from './order-status'

export default interface Order {
  userId: Number
  quantity: Number
  shipDate: Date
  status: OrderStatus
  complete: Boolean
}

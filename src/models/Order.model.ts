import {Entity, model, property} from '@loopback/repository';

@model()
export class Order extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  orderId?: number;

  @property({
    type: 'number',
    required: true,
  })
  product_id: number;


  @property({
    type: 'number',
    required: true,
  })
  customer_id: number;

  @property({
    type: 'string',
    required: true,
  })
  total_price: string;


  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;

import {Entity, model, property} from '@loopback/repository';

@model()
export class Sell extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  _id?: number;

  @property({
    type: 'string',
    required: true,
  })
  product_name: string;


  @property({
    type: 'string',
    required: true,
  })
  quantity: string;

  @property({
    type: 'number',
    required: true,
  })
  seller_id: number;


  @property({
    type: 'string',
    required: true,
  })
  total_price: string;


  constructor(data?: Partial<Sell>) {
    super(data);
  }
}

export interface SellRelations {
  // describe navigational properties here
}

export type SellWithRelations = Sell & SellRelations;

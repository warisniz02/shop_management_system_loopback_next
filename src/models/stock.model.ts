import {Entity, model, property} from '@loopback/repository';

@model()
export class Stock extends Entity {
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
  stock_quantity: string;

  @property({
    type: 'string',
    required: true,
  })
  buying_price: string;

  @property({
    type: 'string',
    required: true,
  })
  selling_price: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isOwner : boolean ;

  constructor(data?: Partial<Stock>) {
    super(data);
  }
}

export interface StockRelations {
  // describe navigational properties here
}

export type StockWithRelations = Stock & StockRelations;

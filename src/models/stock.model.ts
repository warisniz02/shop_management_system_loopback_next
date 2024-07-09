import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Owner} from './owner.model';

@model()
export class Stock extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  stockId?: number;

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
    type: 'number',
    required: true,
  })
  buying_price: number;

  @property({
    type: 'number',
    required: true,
  })
  selling_price: number;

  @property({
    type: 'boolean',
    required: true,
  })
  isOwner: boolean;

  @belongsTo(() => Owner, {name: 'stock_owner'})
  fk_ownerId_stock: number;

  constructor(data?: Partial<Stock>) {
    super(data);
  }
}

export interface StockRelations {
  // describe navigational properties here
}

export type StockWithRelations = Stock & StockRelations;

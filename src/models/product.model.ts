import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Owner} from './owner.model';

@model()
export class Product extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  productId?: number;

  @property({
    type: 'string',
    unique: true,
    required: true,
  })
  product_name: string;

  @property({
    type: 'number',
    required: true
  })
  product_price: number;

  @belongsTo(() => Owner, {name: 'productOwner'})
  ownerId: number;

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;

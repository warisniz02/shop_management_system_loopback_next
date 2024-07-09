import {Entity, hasMany, model, property} from '@loopback/repository';
import {Employee} from './employee.model';
import {Product} from './product.model';
import {Stock} from './stock.model';

@model({
  settings: {
    foreignKeys: {
      fk_ownerId_product: {
        name: 'fk_onwerId_product,',
        foreignKey: 'ownerId',
        entity: 'Owner',
        entityKey: 'id'
      },
    },
  },
})
export class Owner extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  ownerId?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  contact: string;

  @hasMany(() => Employee)
  ownerEmployee: Employee[];

  @hasMany(() => Product)
  ownerProduct: Product[];

  @hasMany(() => Stock, {keyTo: 'fk_ownerId_stock'})
  owner_stock: Stock[];

  constructor(data?: Partial<Owner>) {
    super(data);
  }
}

export interface OwnerRelations {
  // describe navigational properties here
}

export type OwnerWithRelations = Owner & OwnerRelations;

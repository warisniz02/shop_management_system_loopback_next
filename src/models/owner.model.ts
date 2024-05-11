import {Entity, model, property, hasMany} from '@loopback/repository';
import {Employee} from './employee.model';

@model()
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

  constructor(data?: Partial<Owner>) {
    super(data);
  }
}

export interface OwnerRelations {
  // describe navigational properties here
} 

export type OwnerWithRelations = Owner & OwnerRelations;

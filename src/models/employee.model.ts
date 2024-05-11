import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Owner} from './owner.model';

@model()
export class Employee extends Entity {
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
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'number',
    required: true,
  })
  salary: number;

  // @property({
  //   type: 'number',
  //   required: true,
  // })
  // ownerId : number;

  @belongsTo(() => Owner, {name: 'employeeOwner'})
  ownerId: number;

  constructor(data?: Partial<Employee>) {
    super(data);
  }
}

export interface EmployeeRelations {
  // describe navigational properties here
}

export type EmployeeWithRelations = Employee & EmployeeRelations;

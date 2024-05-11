import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Owner,
  Employee,
} from '../models';
import {OwnerRepository} from '../repositories';

export class OwnerEmployeeController {
  constructor(
    @repository(OwnerRepository) protected ownerRepository: OwnerRepository,
  ) { }

  @get('/owners/{id}/employees', {
    responses: {
      '200': {
        description: 'Array of Owner has many Employee',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Employee)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Employee>,
  ): Promise<Employee[]> {
    return this.ownerRepository.ownerEmployee(id).find(filter);
  }

  @post('/owners/{id}/employees', {
    responses: {
      '200': {
        description: 'Owner model instance',
        content: {'application/json': {schema: getModelSchemaRef(Employee)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Owner.prototype.ownerId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employee, {
            title: 'NewEmployeeInOwner',
            exclude: ['_id'],
            optional: ['ownerId']
          }),
        },
      },
    }) employee: Omit<Employee, '_id'>,
  ): Promise<Employee> {
    return this.ownerRepository.ownerEmployee(id).create(employee);
  }

  @patch('/owners/{id}/employees', {
    responses: {
      '200': {
        description: 'Owner.Employee PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employee, {partial: true}),
        },
      },
    })
    employee: Partial<Employee>,
    @param.query.object('where', getWhereSchemaFor(Employee)) where?: Where<Employee>,
  ): Promise<Count> {
    return this.ownerRepository.ownerEmployee(id).patch(employee, where);
  }

  @del('/owners/{id}/employees', {
    responses: {
      '200': {
        description: 'Owner.Employee DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Employee)) where?: Where<Employee>,
  ): Promise<Count> {
    return this.ownerRepository.ownerEmployee(id).delete(where);
  }
}

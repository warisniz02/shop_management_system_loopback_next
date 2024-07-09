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
  Stock,
} from '../models';
import {OwnerRepository} from '../repositories';

export class OwnerStockController {
  constructor(
    @repository(OwnerRepository) protected ownerRepository: OwnerRepository,
  ) { }

  @get('/owners/{id}/stocks', {
    responses: {
      '200': {
        description: 'Array of Owner has many Stock',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Stock)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Stock>,
  ): Promise<Stock[]> {
    return this.ownerRepository.owner_stock(id).find(filter);
  }

  @post('/owners/{id}/stocks', {
    responses: {
      '200': {
        description: 'Owner model instance',
        content: {'application/json': {schema: getModelSchemaRef(Stock)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Owner.prototype.ownerId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stock, {
            title: 'NewStockInOwner',
            exclude: ['stockId'],
            optional: ['fk_ownerId_stock']
          }),
        },
      },
    }) stock: Omit<Stock, 'stockId'>,
  ): Promise<Stock> {
    return this.ownerRepository.owner_stock(id).create(stock);
  }

  @patch('/owners/{id}/stocks', {
    responses: {
      '200': {
        description: 'Owner.Stock PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stock, {partial: true}),
        },
      },
    })
    stock: Partial<Stock>,
    @param.query.object('where', getWhereSchemaFor(Stock)) where?: Where<Stock>,
  ): Promise<Count> {
    return this.ownerRepository.owner_stock(id).patch(stock, where);
  }

  @del('/owners/{id}/stocks', {
    responses: {
      '200': {
        description: 'Owner.Stock DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Stock)) where?: Where<Stock>,
  ): Promise<Count> {
    return this.ownerRepository.owner_stock(id).delete(where);
  }
}

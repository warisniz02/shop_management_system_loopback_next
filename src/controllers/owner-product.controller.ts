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
  Product,
} from '../models';
import {OwnerRepository} from '../repositories';

export class OwnerProductController {
  constructor(
    @repository(OwnerRepository) protected ownerRepository: OwnerRepository,
  ) { }

  @get('/owners/{id}/products', {
    responses: {
      '200': {
        description: 'Array of Owner has many Product',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Product)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Product>,
  ): Promise<Product[]> {
    return this.ownerRepository.ownerProduct(id).find(filter);
  }

  @post('/owners/{id}/products', {
    responses: {
      '200': {
        description: 'Owner model instance',
        content: {'application/json': {schema: getModelSchemaRef(Product)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Owner.prototype.ownerId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {
            title: 'NewProductInOwner',
            exclude: ['productId'],
            optional: ['ownerId']
          }),
        },
      },
    }) product: Omit<Product, 'productId'>,
  ): Promise<Product> {
    return this.ownerRepository.ownerProduct(id).create(product);
  }

  @patch('/owners/{id}/products', {
    responses: {
      '200': {
        description: 'Owner.Product PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {partial: true}),
        },
      },
    })
    product: Partial<Product>,
    @param.query.object('where', getWhereSchemaFor(Product)) where?: Where<Product>,
  ): Promise<Count> {
    return this.ownerRepository.ownerProduct(id).patch(product, where);
  }

  @del('/owners/{id}/products', {
    responses: {
      '200': {
        description: 'Owner.Product DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Product)) where?: Where<Product>,
  ): Promise<Count> {
    return this.ownerRepository.ownerProduct(id).delete(where);
  }
}

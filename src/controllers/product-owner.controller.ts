import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Product,
  Owner,
} from '../models';
import {ProductRepository} from '../repositories';

export class ProductOwnerController {
  constructor(
    @repository(ProductRepository)
    public productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/owner', {
    responses: {
      '200': {
        description: 'Owner belonging to Product',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Owner),
          },
        },
      },
    },
  })
  async getOwner(
    @param.path.number('id') id: typeof Product.prototype.productId,
  ): Promise<Owner> {
    return this.productRepository.productOwner(id);
  }
}

import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Stock,
  Owner,
} from '../models';
import {StockRepository} from '../repositories';

export class StockOwnerController {
  constructor(
    @repository(StockRepository)
    public stockRepository: StockRepository,
  ) { }

  @get('/stocks/{id}/owner', {
    responses: {
      '200': {
        description: 'Owner belonging to Stock',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Owner),
          },
        },
      },
    },
  })
  async getOwner(
    @param.path.number('id') id: typeof Stock.prototype.stockId,
  ): Promise<Owner> {
    return this.stockRepository.stock_owner(id);
  }
}

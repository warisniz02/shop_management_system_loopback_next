import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Sell} from '../models';
import {SellRepository} from '../repositories';

export class SellController {
  constructor(
    @repository(SellRepository)
    public sellRepository : SellRepository,
  ) {}

  @post('/sells')
  @response(200, {
    description: 'Sell model instance',
    content: {'application/json': {schema: getModelSchemaRef(Sell)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sell, {
            title: 'NewSell',
            exclude: ['_id'],
          }),
        },
      },
    })
    sell: Omit<Sell, 'id'>,
  ): Promise<Sell> {
    return this.sellRepository.create(sell);
  }

  @get('/sells/count')
  @response(200, {
    description: 'Sell model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Sell) where?: Where<Sell>,
  ): Promise<Count> {
    return this.sellRepository.count(where);
  }

  @get('/sells')
  @response(200, {
    description: 'Array of Sell model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Sell, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Sell) filter?: Filter<Sell>,
  ): Promise<Sell[]> {
    return this.sellRepository.find(filter);
  }

  @patch('/sells')
  @response(200, {
    description: 'Sell PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sell, {partial: true}),
        },
      },
    })
    sell: Sell,
    @param.where(Sell) where?: Where<Sell>,
  ): Promise<Count> {
    return this.sellRepository.updateAll(sell, where);
  }

  @get('/sells/{id}')
  @response(200, {
    description: 'Sell model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Sell, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Sell, {exclude: 'where'}) filter?: FilterExcludingWhere<Sell>
  ): Promise<Sell> {
    return this.sellRepository.findById(id, filter);
  }

  @patch('/sells/{id}')
  @response(204, {
    description: 'Sell PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sell, {partial: true}),
        },
      },
    })
    sell: Sell,
  ): Promise<void> {
    await this.sellRepository.updateById(id, sell);
  }

  @put('/sells/{id}')
  @response(204, {
    description: 'Sell PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() sell: Sell,
  ): Promise<void> {
    await this.sellRepository.replaceById(id, sell);
  }

  @del('/sells/{id}')
  @response(204, {
    description: 'Sell DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.sellRepository.deleteById(id);
  }
}

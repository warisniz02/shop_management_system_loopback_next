import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Stock, StockRelations, Owner} from '../models';
import {OwnerRepository} from './owner.repository';

export class StockRepository extends DefaultCrudRepository<
  Stock,
  typeof Stock.prototype.stockId,
  StockRelations
> {

  public readonly stock_owner: BelongsToAccessor<Owner, typeof Stock.prototype.stockId>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('OwnerRepository') protected ownerRepositoryGetter: Getter<OwnerRepository>,
  ) {
    super(Stock, dataSource);
    this.stock_owner = this.createBelongsToAccessorFor('stock_owner', ownerRepositoryGetter,);
  }
}

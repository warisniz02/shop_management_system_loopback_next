import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Sell, SellRelations} from '../models';

export class SellRepository extends DefaultCrudRepository<
  Sell,
  typeof Sell.prototype._id,
  SellRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Sell, dataSource);
  }
}

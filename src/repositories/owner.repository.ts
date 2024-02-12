import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Owner, OwnerRelations} from '../models';

export class OwnerRepository extends DefaultCrudRepository<
  Owner,
  typeof Owner.prototype._id,
  OwnerRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Owner, dataSource);
  }
}

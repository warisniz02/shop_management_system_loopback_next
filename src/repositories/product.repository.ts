import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Product, ProductRelations, Owner} from '../models';
import {OwnerRepository} from './owner.repository';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.productId,
  ProductRelations
> {

  public readonly productOwner: BelongsToAccessor<Owner, typeof Product.prototype.productId>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('OwnerRepository') protected ownerRepositoryGetter: Getter<OwnerRepository>,
  ) {
    super(Product, dataSource);
    this.productOwner = this.createBelongsToAccessorFor('productOwner', ownerRepositoryGetter,);
    this.registerInclusionResolver('productOwner', this.productOwner.inclusionResolver);
  }
}

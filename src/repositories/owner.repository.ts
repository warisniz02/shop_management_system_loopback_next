import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Employee, Owner, OwnerRelations, Product, Stock} from '../models';
import {EmployeeRepository} from './employee.repository';
import {ProductRepository} from './product.repository';
import {StockRepository} from './stock.repository';

export class OwnerRepository extends DefaultCrudRepository<
  Owner,
  typeof Owner.prototype.ownerId,
  OwnerRelations
> {

  public readonly ownerEmployee: HasManyRepositoryFactory<Employee, typeof Owner.prototype.ownerId>;

  public readonly ownerProduct: HasManyRepositoryFactory<Product, typeof Owner.prototype.ownerId>;

  public readonly owner_stock: HasManyRepositoryFactory<Stock, typeof Owner.prototype.ownerId>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('EmployeeRepository') protected employeeRepositoryGetter: Getter<EmployeeRepository>, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>, @repository.getter('StockRepository') protected stockRepositoryGetter: Getter<StockRepository>,
  ) {
    super(Owner, dataSource);
    this.owner_stock = this.createHasManyRepositoryFactoryFor('owner_stock', stockRepositoryGetter,);

    this.ownerProduct = this.createHasManyRepositoryFactoryFor('ownerProduct', productRepositoryGetter,);
    this.registerInclusionResolver('ownerProduct', this.ownerProduct.inclusionResolver);
    this.ownerEmployee = this.createHasManyRepositoryFactoryFor('ownerEmployee', employeeRepositoryGetter,);
    this.registerInclusionResolver('ownerEmployee', this.ownerEmployee.inclusionResolver);
  }
}

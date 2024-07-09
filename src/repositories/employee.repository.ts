import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Employee, EmployeeRelations, Owner} from '../models';
import {OwnerRepository} from './owner.repository';

export class EmployeeRepository extends DefaultCrudRepository<
  Employee,
  typeof Employee.prototype.employeeId,
  EmployeeRelations
> {

  public readonly employeeOwner: BelongsToAccessor<Owner, typeof Employee.prototype.employeeId>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('OwnerRepository') protected ownerRepositoryGetter: Getter<OwnerRepository>,
  ) {
    super(Employee, dataSource);
    this.employeeOwner = this.createBelongsToAccessorFor('employeeOwner', ownerRepositoryGetter,);
    this.registerInclusionResolver('employeeOwner', this.employeeOwner.inclusionResolver);
  }
}

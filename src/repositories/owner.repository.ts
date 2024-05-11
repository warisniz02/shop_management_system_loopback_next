import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Owner, OwnerRelations, Employee} from '../models';
import {EmployeeRepository} from './employee.repository';

export class OwnerRepository extends DefaultCrudRepository<
  Owner,
  typeof Owner.prototype.ownerId,
  OwnerRelations
> {

  public readonly ownerEmployee: HasManyRepositoryFactory<Employee, typeof Owner.prototype.ownerId>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('EmployeeRepository') protected employeeRepositoryGetter: Getter<EmployeeRepository>,
  ) {
    super(Owner, dataSource);
    this.ownerEmployee = this.createHasManyRepositoryFactoryFor('ownerEmployee', employeeRepositoryGetter,);
    this.registerInclusionResolver('ownerEmployee', this.ownerEmployee.inclusionResolver);
  }
}

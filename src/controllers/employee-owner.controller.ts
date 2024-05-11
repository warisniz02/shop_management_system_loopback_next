import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Employee,
  Owner,
} from '../models';
import {EmployeeRepository} from '../repositories';

export class EmployeeOwnerController {
  constructor(
    @repository(EmployeeRepository)
    public employeeRepository: EmployeeRepository,
  ) { }

  @get('/employees/{id}/owner', {
    responses: {
      '200': {
        description: 'Owner belonging to Employee',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Owner),
          },
        },
      },
    },
  })
  async getOwner(
    @param.path.number('id') id: typeof Employee.prototype._id,
  ): Promise<Owner> {
    return this.employeeRepository.employeeOwner(id);
  }
}

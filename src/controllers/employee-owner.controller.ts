import {
  repository,
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
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
    @param.path.number('id') id: typeof Employee.prototype.employeeId,
  ): Promise<Owner> {
    return this.employeeRepository.employeeOwner(id);
  }
}

import {Filter, FilterExcludingWhere, repository} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {Peripheral} from '../models';
import {PeripheralRepository} from '../repositories';

export class PeripheralController {
  constructor(
    @repository(PeripheralRepository)
    public peripheralRepository: PeripheralRepository,
  ) {}

  @post('/peripherals')
  @response(200, {
    description: 'Peripheral model instance',
    content: {'application/json': {schema: getModelSchemaRef(Peripheral)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Peripheral, {
            title: 'NewPeripheral',
          }),
        },
      },
    })
    peripheral: Peripheral,
  ): Promise<Peripheral> {
    const resp = await this.peripheralRepository.count({
      gatewayId: peripheral.gatewayId,
    });
    if (resp.count > 9) {
      const err: ValidationError = new ValidationError(
        'No more that 10 peripheral devices are allowed for a gateway',
      );
      err.statusCode = 400;
      throw err;
    }
    return this.peripheralRepository.create(peripheral);
  }

  @get('/peripherals')
  @response(200, {
    description: 'Array of Peripheral model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Peripheral, {includeRelations: false}),
        },
      },
    },
  })
  async find(
    @param.filter(Peripheral) filter?: Filter<Peripheral>,
  ): Promise<Peripheral[]> {
    return this.peripheralRepository.find(filter);
  }

  @get('/peripherals/{id}')
  @response(200, {
    description: 'Peripheral model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Peripheral, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Peripheral, {exclude: 'where'})
    filter?: FilterExcludingWhere<Peripheral>,
  ): Promise<Peripheral> {
    return this.peripheralRepository.findById(id, filter);
  }

  @del('/peripherals/{id}')
  @response(204, {
    description: 'Peripheral DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.peripheralRepository.deleteById(id);
  }
}

class ValidationError extends Error {
  code?: string;
  statusCode?: number;
}

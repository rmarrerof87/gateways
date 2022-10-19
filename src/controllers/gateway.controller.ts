import {Filter, FilterExcludingWhere, repository} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {Gateway} from '../models';
import {GatewayRepository} from '../repositories';

export class GatewayController {
  constructor(
    @repository(GatewayRepository)
    public gatewayRepository: GatewayRepository,
  ) {}

  @post('/gateways')
  @response(200, {
    description: 'Gateway model instance',
    content: {'application/json': {schema: getModelSchemaRef(Gateway)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gateway, {
            title: 'NewGateway',
          }),
        },
      },
    })
    gateway: Gateway,
  ): Promise<Gateway> {
    return this.gatewayRepository.create(gateway);
  }

  @get('/gateways')
  @response(200, {
    description: 'Array of Gateway model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Gateway, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Gateway) filter?: Filter<Gateway>,
  ): Promise<Gateway[]> {
    return this.gatewayRepository.find(filter);
  }

  @get('/gateways/{id}')
  @response(200, {
    description: 'Gateway model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Gateway, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Gateway, {exclude: 'where'})
    filter?: FilterExcludingWhere<Gateway>,
  ): Promise<Gateway> {
    return this.gatewayRepository.findById(id, filter);
  }
}

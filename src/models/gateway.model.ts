import {Entity, hasMany, model, property} from '@loopback/repository';
import {Peripheral} from './peripheral.model';

@model()
export class Gateway extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  serialNumber: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
    default: '0.0.0.0',
    jsonSchema: {
      pattern:
        '(\\b25[0-5]|\\b2[0-4][0-9]|\\b[01]?[0-9][0-9]?)(\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}',
      errorMessage: 'Invalid ipv4 address',
    },
  })
  ipv4: string;

  @hasMany(() => Peripheral)
  peripherals: Peripheral[];

  constructor(data?: Partial<Gateway>) {
    super(data);
  }
}

export interface GatewayRelations {
  // describe navigational properties here
}

export type GatewayWithRelations = Gateway & GatewayRelations;

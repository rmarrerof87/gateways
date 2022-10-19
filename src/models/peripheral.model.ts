import {Entity, model, property} from '@loopback/repository';

enum Status {
  ONLINE = 'online',
  OFFLINE = 'offline',
}

@model()
export class Peripheral extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  uid: number;

  @property({
    type: 'string',
    required: true,
  })
  vendor: string;

  @property({
    type: 'date',
    required: true,
    defaultFn: 'now',
  })
  createdDate: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(Status),
    },
  })
  status: 'online' | 'offline';

  @property({
    type: 'string',
  })
  gatewayId?: string;

  constructor(data?: Partial<Peripheral>) {
    super(data);
  }
}

export interface PeripheralRelations {
  // describe navigational properties here
}

export type PeripheralWithRelations = Peripheral & PeripheralRelations;

import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Peripheral, PeripheralRelations} from '../models';

export class PeripheralRepository extends DefaultCrudRepository<
  Peripheral,
  typeof Peripheral.prototype.uid,
  PeripheralRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Peripheral, dataSource);
  }
}

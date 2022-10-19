import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Gateway, GatewayRelations, Peripheral} from '../models';
import {PeripheralRepository} from './peripheral.repository';

export class GatewayRepository extends DefaultCrudRepository<
  Gateway,
  typeof Gateway.prototype.serialNumber,
  GatewayRelations
> {

  public readonly peripherals: HasManyRepositoryFactory<Peripheral, typeof Gateway.prototype.serialNumber>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('PeripheralRepository') protected peripheralRepositoryGetter: Getter<PeripheralRepository>,
  ) {
    super(Gateway, dataSource);
    this.peripherals = this.createHasManyRepositoryFactoryFor('peripherals', peripheralRepositoryGetter,);
  }
}

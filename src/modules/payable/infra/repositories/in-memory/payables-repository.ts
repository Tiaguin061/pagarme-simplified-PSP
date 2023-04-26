import { Payable, PayableStatus } from '@root/modules/payable/domain/entities/payable';

import { IPayableRepository } from '@root/modules/payable/domain/repositories/payable-repository';

export class InMemoryPayablesRepository implements IPayableRepository {
  payables: Payable[] = [];

  async create(payable: Payable): Promise<Payable> {
    this.payables.push(payable);

    return payable;
  }

  async exists(payable_id: string): Promise<Payable> {
    return this.payables.find(where => where.id === payable_id);
  }

  async findMany(): Promise<Payable[]> {
    return this.payables;
  }

  async findManyByStatus(payable_status: PayableStatus): Promise<Payable[]> {
    return this.payables.filter(where => where.props.status === payable_status);
  }
}
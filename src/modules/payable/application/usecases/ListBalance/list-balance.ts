import { Either, right } from '@root/core/logic/Either';

import { IPayableRepository } from '@root/modules/payable/domain/repositories/payable-repository';
import { Payable } from '@root/modules/payable/domain/entities/payable';

export type ListBalanceResponse = Either<
  null,
  {
    available: Payable[],
    waiting_funds: Payable[],
  }
>;

export class ListBalance {
  constructor(
    private payableRepository: IPayableRepository,
  ) { }

  async execute(): Promise<ListBalanceResponse> {
    const available = await this.payableRepository.findManyByStatus('paid');
    const waiting_funds = await this.payableRepository.findManyByStatus('waiting_funds');

    return right({
      available,
      waiting_funds
    });
  }
}
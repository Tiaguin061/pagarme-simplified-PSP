import { clientError, fail, ok } from '@root/core/infra/HttpResponse';

import { Controller } from '@root/core/infra/Controller';
import { ListBalance } from './list-balance';
import { PayableMapper } from '@root/modules/payable/domain/mappers/payable-mapper';

export class ListBalanceController implements Controller {
  constructor(
    private readonly listBalance: ListBalance,
  ) { }

  async handle() {
    try {
      const balanceOrError = await this.listBalance.execute();

      if (balanceOrError.isLeft()) {
        const error = balanceOrError.value;

        return clientError(error);
      }

      const result = {
        available: {
          ...balanceOrError.value.available,
          payables: balanceOrError.value.available.payables.map(payable => PayableMapper.transformForResponse(payable)),
        },
        waiting_funds: {
          ...balanceOrError.value.waiting_funds,
          payables: balanceOrError.value.waiting_funds.payables.map(payable => PayableMapper.transformForResponse(payable)),
        },
      };

      return ok(result);
    } catch (error) {
      return fail(error);
    }
  }
}
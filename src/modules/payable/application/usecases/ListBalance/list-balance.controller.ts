import { clientError, fail, ok } from '@root/core/infra/HttpResponse';

import { Controller } from '@root/core/infra/Controller';
import { ListBalance } from './list-balance';

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

      return ok(balanceOrError.value);
    } catch (error) {
      return fail(error);
    }
  }
}
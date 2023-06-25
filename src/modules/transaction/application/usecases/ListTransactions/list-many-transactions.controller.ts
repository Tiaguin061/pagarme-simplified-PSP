import { clientError, fail, ok } from '@root/core/infra/HttpResponse';

import { Controller } from '@root/core/infra/Controller';
import { ListManyTransaction } from './list-many-transactions';
import { TransactionMapper } from '@root/modules/transaction/domain/mappers/transaction-mapper';

export class ListTransactionsController implements Controller {
  constructor(
    private readonly listTransactions: ListManyTransaction,
  ) { }

  async handle() {
    try {
      const transactionsOrError = await this.listTransactions.execute();

      if (transactionsOrError.isLeft()) {
        const error = transactionsOrError.value;

        return clientError(error);
      }

      const success = {
        transaction: transactionsOrError.value.map(transaction => TransactionMapper.transformForResponse(transaction)),
      };

      return ok(success);
    } catch (error) {
      return fail(error);
    }
  }
}
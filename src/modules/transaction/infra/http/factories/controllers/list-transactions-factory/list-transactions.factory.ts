import { ITransactionRepository } from '@root/modules/transaction/domain/repositories/transaction-repository';
import { ListManyTransaction } from '@root/modules/transaction/application/usecases/ListTransactions/list-many-transactions';
import { ListTransactionsController } from '@root/modules/transaction/application/usecases/ListTransactions/list-many-transactions.controller';

export function listTransactionsFactory(
  transactionRepository: ITransactionRepository,
) {
  const listTransactions = new ListManyTransaction(transactionRepository);

  const listTransactionsController = new ListTransactionsController(
    listTransactions,
  );

  return listTransactionsController;
}
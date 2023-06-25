import { DateFnsProvider } from '@root/shared/providers/date/implementations/date-fns.provider';
import { InMemoryPayablesRepository } from '@root/modules/payable/infra/repositories/in-memory/payables-repository';
import { InMemoryTransactionRepository } from '@root/modules/transaction/infra/repositories/in-memory/transactions-repository';
import { createTransactionFactory } from './create-transaction.factory';

export function makeCreateTransactionFactory() {
  const transactionRepository = new InMemoryTransactionRepository();
  const payableRepository = new InMemoryPayablesRepository();
  const dateProvider = new DateFnsProvider();

  const make = createTransactionFactory(
    transactionRepository,
    payableRepository,
    dateProvider
  )

  return make;
}
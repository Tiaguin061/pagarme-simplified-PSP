import { CreatePayable } from '@root/modules/payable/application/usecases/CreatePayable/create-payable';
import { CreateTransaction } from '@root/modules/transaction/application/usecases/CreateTransaction/create-transaction';
import { CreateTransactionController } from '@root/modules/transaction/application/usecases/CreateTransaction/create-transaction.controller';
import { DateProvider } from '@root/shared/providers/date/models/date-provider';
import { IPayableRepository } from '@root/modules/payable/domain/repositories/payable-repository';
import { ITransactionRepository } from '@root/modules/transaction/domain/repositories/transaction-repository';

export function createTransactionFactory(
  transactionRepository: ITransactionRepository,
  payableRepository: IPayableRepository,
  dateProvider: DateProvider,
) {
  const createTransaction = new CreateTransaction(transactionRepository);
  const createPayable = new CreatePayable(payableRepository, dateProvider);

  const createTransactionController = new CreateTransactionController(
    createTransaction,
    createPayable,
  );

  return createTransactionController;
}
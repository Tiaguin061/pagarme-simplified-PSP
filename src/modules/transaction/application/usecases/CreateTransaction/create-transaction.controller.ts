import { clientError, created, fail } from '@root/core/infra/HttpResponse';

import { Controller } from '@root/core/infra/Controller';
import { CreatePayable } from '@root/modules/payable/application/usecases/CreatePayable/create-payable';
import { CreateTransaction } from './create-transaction';
import { PaymentMethod } from '@root/modules/transaction/domain/entities/transaction/transaction';
import { TransactionMapper } from '@root/modules/transaction/domain/mappers/transaction-mapper';

type CreateTransactionRequest = {
  description?: string;
  payment_method: PaymentMethod;
  card_number: number;
  card_holder_name: string;
  card_expiration_date: Date;
  card_verification_code: number;
  value: number;
}

export class CreateTransactionController implements Controller {
  constructor(
    private readonly createTransaction: CreateTransaction,
    private readonly createPayable: CreatePayable,
  ) { }

  async handle(request: CreateTransactionRequest) {
    try {
      const transactionOrError = await this.createTransaction.execute(request);

      if (transactionOrError.isLeft()) {
        const error = transactionOrError.value;

        return clientError(error);
      }

      const payableOrError = await this.createPayable.execute({
        transaction: transactionOrError.value,
      });

      if (payableOrError.isLeft()) {
        return clientError(payableOrError.value);
      }

      const success = {
        transaction: TransactionMapper.transformForResponse(transactionOrError.value),
      };

      return created(success);
    } catch (error) {
      return fail(error);
    }
  }
}
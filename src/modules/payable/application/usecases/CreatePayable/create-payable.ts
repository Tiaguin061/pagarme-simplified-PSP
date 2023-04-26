import { Either, right } from '@root/core/logic/Either';
import { IPayable, Payable } from '@root/modules/payable/domain/entities/payable';

import { DateProvider } from '@root/shared/providers/date/models/date-provider';
import { IPayableRepository } from '@root/modules/payable/domain/repositories/payable-repository';
import { Transaction } from '@root/modules/transaction/domain/entities/transaction/transaction';

export type CreatePayableInput = {
  transaction: Transaction;
}

export type CreatePayableResponse = Either<
  null,
  Payable
>;

export class CreatePayable {
  constructor(
    private payableRepository: IPayableRepository,
    private dateProvider: DateProvider,
  ) { }

  async execute({ transaction }: CreatePayableInput): Promise<CreatePayableResponse> {
    let payableInput: IPayable = {
      payment_date: new Date(),
      status: 'waiting_funds',
      transaction,
      transaction_id: transaction.id,
    };

    if (transaction.payment_method === 'debit_card') {
      payableInput.status = 'paid';
    }

    if (transaction.payment_method === 'credit_card') {
      const paymentDateThirtyDayAfter = this.dateProvider.add(payableInput.payment_date, {
        days: 30
      });

      payableInput.payment_date = paymentDateThirtyDayAfter;
    }

    const payableOrError = Payable.create(payableInput);

    const payable = payableOrError.value;

    await this.payableRepository.create(payable);

    return right(payable);
  }
}
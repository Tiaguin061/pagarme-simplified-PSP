import { Either, left, right } from '@root/core/logic/Either';
import { PaymentMethod, Transaction } from '@root/modules/transaction/domain/entities/transaction/transaction';

import { CardNumber } from '@root/modules/transaction/domain/entities/transaction/card-number';
import { CreatePayable } from '@root/modules/payable/application/usecases/CreatePayable/create-payable';
import { ITransactionRepository } from '@root/modules/transaction/domain/repositories/transaction-repository';
import { InvalidCardNumberError } from '@root/modules/transaction/domain/entities/transaction/errors/InvalidCardNumberError';
import { Payable } from '@root/modules/payable/domain/entities/payable';

type CreateTransactionRequest = {
  description?: string;
  payment_method: PaymentMethod;
  card_number: number;
  card_holder_name: string;
  card_expiration_date: Date;
  card_verification_code: number;
}

type CreateTransactionResponse = Either<
  InvalidCardNumberError,
  {
    transaction: Transaction;
    payable: Payable;
  }
>;

export class CreateTransaction {
  constructor(
    private transactionRepository: ITransactionRepository,
    private createPayable: CreatePayable,
  ) { }
  async execute(data: CreateTransactionRequest): Promise<CreateTransactionResponse> {
    const { card_number } = data;

    const cardNumberOrError = CardNumber.create(card_number);

    if (cardNumberOrError.isLeft()) {
      return left(cardNumberOrError.value);
    }

    const transactionOrError = Transaction.create({
      ...data,
      card_number: cardNumberOrError.value
    });

    const transaction = transactionOrError.value;

    await this.transactionRepository.create(transaction);

    const payableOrError = await this.createPayable.execute({
      transaction
    });

    if (payableOrError.isLeft()) {
      return left(payableOrError.value);
    }

    return right({
      transaction,
      payable: payableOrError.value
    });
  }
}


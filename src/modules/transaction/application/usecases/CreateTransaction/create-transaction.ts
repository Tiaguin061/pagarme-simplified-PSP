import { Either, left, right } from '@root/core/logic/Either';
import { PaymentMethod, Transaction } from '@root/modules/transaction/domain/entities/transaction/transaction';

import { CardNumber } from '@root/modules/transaction/domain/entities/transaction/card-number';
import { ITransactionRepository } from '@root/modules/transaction/domain/repositories/transaction-repository';
import { InvalidCardNumberError } from '@root/modules/transaction/domain/entities/transaction/errors/InvalidCardNumberError';

type CreateTransactionRequest = {
  description?: string;
  payment_method: PaymentMethod;
  card_number: number;
  card_holder_name: string;
  card_expiration_date: Date;
  card_verification_code: number;
  value: number;
}

type CreateTransactionResponse = Either<
  InvalidCardNumberError,
  Transaction
>;

export class CreateTransaction {
  constructor(
    private transactionRepository: ITransactionRepository,
  ) { }
  async execute(data: CreateTransactionRequest): Promise<CreateTransactionResponse> {
    const { card_number, value, payment_method } = data;

    const cardNumberOrError = CardNumber.create(card_number);

    if (cardNumberOrError.isLeft()) {
      return left(cardNumberOrError.value);
    }

    const feeRateOptions = {
      debit_card: 0.03,
      credit_card: 0.05,
    };

    const feeRate = feeRateOptions[payment_method];

    let fee = value * feeRate;
    let payableAmount = value - fee;

    const transactionOrError = Transaction.create({
      ...data,
      value: payableAmount,
      card_number: cardNumberOrError.value
    });

    if (transactionOrError.isLeft()) {
      return left(transactionOrError.value);
    }

    const transaction = transactionOrError.value;

    await this.transactionRepository.create(transaction);

    return right(transaction);
  }
}


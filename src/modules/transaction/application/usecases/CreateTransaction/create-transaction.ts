import { Either, left, right } from '@root/core/logic/Either';
import { PaymentMethod, Transaction } from '@root/modules/transaction/domain/entities/transaction/transaction';

import { CardNumber } from '@root/modules/transaction/domain/entities/transaction/card-number';
import { InvalidCardNumberError } from '@root/modules/transaction/domain/entities/transaction/errors/InvalidCardNumberError';
import { ITransactionRepository } from '@root/modules/transaction/domain/repositories/transaction-repository';

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
  Transaction
>;

export class CreateTransaction {
  constructor(
    private transactionRepository: ITransactionRepository,
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

    return right(transaction);
  }
}


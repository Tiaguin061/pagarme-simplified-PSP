import { Either, left, right } from '@root/core/logic/Either';
import { PaymentMethod, Transaction } from '@root/modules/transaction/domain/entities/transaction/transaction';

import { CreatePayable } from '@root/modules/payable/application/usecases/CreatePayable/create-payable';
import { Payable } from '@root/modules/payable/domain/entities/payable';
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
  value: number;
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


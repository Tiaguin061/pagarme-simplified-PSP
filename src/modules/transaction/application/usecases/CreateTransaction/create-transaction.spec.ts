import { beforeAll, describe, expect, it, jest } from '@jest/globals';

import { CreatePayable } from '@root/modules/payable/application/usecases/CreatePayable/create-payable';
import { CreateTransaction } from './create-transaction';
import { DateFnsProvider } from '@root/shared/providers/date/implementations/date-fns.provider';
import { DateProvider } from '@root/shared/providers/date/models/date-provider';
import { IPayableRepository } from '@root/modules/payable/domain/repositories/payable-repository';
import { ITransactionRepository } from '@root/modules/transaction/domain/repositories/transaction-repository';
import { InMemoryPayablesRepository } from '@root/modules/payable/infra/repositories/in-memory/payables-repository';
import { InMemoryTransactionRepository } from '@root/modules/transaction/infra/repositories/in-memory/transactions-repository';
import { InvalidCardNumberError } from '@root/modules/transaction/domain/entities/transaction/errors/InvalidCardNumberError';
import { PaymentMethod } from '@root/modules/transaction/domain/entities/transaction/transaction';
import { left } from '@root/core/logic/Either';

let createTransaction: CreateTransaction;
let transactionRepository: ITransactionRepository;

let createPayable: CreatePayable;
let payableRepository: IPayableRepository;
let dateProvider: DateProvider;

describe('Create Transaction use-case', () => {
  beforeAll(() => {
    transactionRepository = new InMemoryTransactionRepository();

    payableRepository = new InMemoryPayablesRepository();
    dateProvider = new DateFnsProvider();
    createPayable = new CreatePayable(payableRepository, dateProvider);

    createTransaction = new CreateTransaction(transactionRepository, createPayable);
  })
  it('it should be able to create', async () => {
    const response = await createTransaction.execute({
      card_expiration_date: new Date(),
      card_holder_name: 'John Doe',
      card_number: 123456789,
      card_verification_code: 123,
      payment_method: 'credit_card',
      description: 'Fake description',
      value: 10,
    });

    expect(await transactionRepository.exists(6789)).toBeTruthy();
    expect(response.isRight()).toBeTruthy();
  });

  it('it should be able return error if card_number is invalid', async () => {
    const response = await createTransaction.execute({
      card_expiration_date: new Date(),
      card_holder_name: 'John Doe',
      card_number: Number('Invalid card number'),
      card_verification_code: 123,
      payment_method: 'credit_card',
      description: 'Fake description',
      value: 10,
    });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(InvalidCardNumberError)
  });

  it('it should be able return payable error', async () => {
    jest.spyOn(createPayable, "execute").mockImplementationOnce(async () => {
      return left(null);
    });

    const response = await createTransaction.execute({
      card_expiration_date: new Date(),
      card_holder_name: 'John Doe',
      card_number: 123456789,
      card_verification_code: 123,
      payment_method: 'credit_card',
      description: 'Fake description',
      value: 10,
    });

    expect(response.isLeft()).toBe(true)
  });

  it('must be able to create with processing fee using credit card', async () => {
    let value = 10;
    const payment_method = 'credit_card';;

    const feeRateOptions = {
      debit_card: 0.03,
      credit_card: 0.05,
    };

    const feeRate = feeRateOptions[payment_method];
    const fee = value * feeRate;
    const payableAmount = value - fee;

    const transaction = {
      card_expiration_date: new Date(),
      card_holder_name: 'John Doe',
      card_number: 123456789,
      card_verification_code: 123,
      payment_method: payment_method as PaymentMethod,
      description: 'Fake description',
      value: payableAmount,
    };

    const response = await createTransaction.execute(transaction);

    expect(await transactionRepository.exists(6789)).toBeTruthy();
    expect(response.isRight()).toBeTruthy();
  });

  it('must be able to create with processing fee using debit card', async () => {
    let value = 10;
    const payment_method = 'debit_card';;

    const feeRateOptions = {
      debit_card: 0.03,
      credit_card: 0.05,
    };

    const feeRate = feeRateOptions[payment_method];
    const fee = value * feeRate;
    const payableAmount = value - fee;

    const transaction = {
      card_expiration_date: new Date(),
      card_holder_name: 'John Doe',
      card_number: 123456789,
      card_verification_code: 123,
      payment_method: payment_method as PaymentMethod,
      description: 'Fake description',
      value: payableAmount,
    };

    const response = await createTransaction.execute(transaction);

    expect(await transactionRepository.exists(6789)).toBeTruthy();
    expect(response.isRight()).toBeTruthy();
  });
})
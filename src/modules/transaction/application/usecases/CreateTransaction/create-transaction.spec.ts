import { beforeAll, describe, expect, it } from '@jest/globals';

import { InvalidCardNumberError } from '@root/modules/transaction/domain/entities/transaction/errors/InvalidCardNumberError';
import { ITransactionRepository } from '@root/modules/transaction/domain/repositories/transaction-repository';
import { InMemoryTransactionRepository } from '@root/modules/transaction/infra/repositories/in-memory/transactions-repository';
import { CreateTransaction } from './create-transaction';

let createTransaction: CreateTransaction;
let transactionRepository: ITransactionRepository;

describe('Create Transaction use-case', () => {
  beforeAll(() => {
    transactionRepository = new InMemoryTransactionRepository();
    createTransaction = new CreateTransaction(transactionRepository);
  })
  it('Should be able to create', async () => {
    const response = await createTransaction.execute({
      card_expiration_date: new Date(),
      card_holder_name: 'John Doe',
      card_number: 123456789,
      card_verification_code: 123,
      payment_method: 'credit_card',
      description: 'Fake description'
    });

    expect(await transactionRepository.exists(6789)).toBeTruthy();
    expect(response.isRight()).toBeTruthy();
  });

  it('Should be able return error if card_number is invalid', async () => {
    const response = await createTransaction.execute({
      card_expiration_date: new Date(),
      card_holder_name: 'John Doe',
      card_number: Number('Invalid card number'),
      card_verification_code: 123,
      payment_method: 'credit_card',
      description: 'Fake description'
    });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(InvalidCardNumberError)
  });
})
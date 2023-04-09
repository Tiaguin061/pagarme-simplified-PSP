import { beforeAll, describe, expect, it } from '@jest/globals';

import { CardNumber } from '@root/modules/transaction/domain/entities/transaction/card-number';
import { Transaction } from '@root/modules/transaction/domain/entities/transaction/transaction';
import { ITransactionRepository } from '@root/modules/transaction/domain/repositories/transaction-repository';
import { InMemoryTransactionRepository } from '@root/modules/transaction/infra/repositories/in-memory/transactions-repository';
import { ListManyTransaction } from './list-many-transactions';

let listManyTransaction: ListManyTransaction;
let transactionRepository: ITransactionRepository;

describe('List Many Transaction use-case', () => {
  beforeAll(() => {
    transactionRepository = new InMemoryTransactionRepository();
    listManyTransaction = new ListManyTransaction(transactionRepository);
  })
  it('Should be able to list all transactions', async () => {
    const transaction = Transaction.create({
      card_expiration_date: new Date(),
      card_holder_name: 'John Doe',
      card_number: CardNumber.create(123456789).value as CardNumber,
      card_verification_code: 123,
      payment_method: 'credit_card',
      description: 'Fake description'
    });

    await transactionRepository.create(transaction.value);

    const response = await listManyTransaction.execute();

    expect(response.isRight()).toBeTruthy();
    expect(response.value).toStrictEqual([transaction.value]);
  });
})
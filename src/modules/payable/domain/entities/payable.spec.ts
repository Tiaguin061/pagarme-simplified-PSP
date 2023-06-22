import { describe, expect, it } from '@jest/globals';

import { CardNumber } from '@root/modules/transaction/domain/entities/transaction/card-number';
import { Payable } from './payable';
import { Transaction } from '@root/modules/transaction/domain/entities/transaction/transaction';

describe('Payable Entity domain', () => {
  it('it should be able create with paid status', () => {
    const transaction = Transaction.create({
      card_expiration_date: new Date(),
      card_holder_name: 'John Doe',
      card_number: CardNumber.create(123456789).value as CardNumber,
      card_verification_code: 123,
      payment_method: 'credit_card',
      description: 'Fake description',
      value: 10
    }).value;

    const payable = new Payable({
      payment_date: new Date(),
      status: 'paid',
      transaction_id: transaction.id,
      transaction,
    });

    expect(payable).toHaveProperty('id');
    expect(payable.props.status).toStrictEqual('paid');
  });

  it('it should be able create with waiting_funds status', () => {
    const transaction = Transaction.create({
      card_expiration_date: new Date(),
      card_holder_name: 'John Doe',
      card_number: CardNumber.create(123456789).value as CardNumber,
      card_verification_code: 123,
      payment_method: 'credit_card',
      description: 'Fake description',
      value: 10
    }).value;

    const payable = new Payable({
      payment_date: new Date(),
      status: 'waiting_funds',
      transaction_id: transaction.id,
      transaction,
    });

    expect(payable).toHaveProperty('id');
    expect(payable.props.status).toStrictEqual('waiting_funds');
  });
});
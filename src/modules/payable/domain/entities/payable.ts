import { Either, right } from '@root/core/logic/Either';

import { Entity } from '@root/core/domain/Entity';
import { Transaction } from '@root/modules/transaction/domain/entities/transaction/transaction';

export type PayableStatus = 'paid' | 'waiting_funds';

export interface IPayable {
  payment_date: Date;
  transaction_id: string;

  status: PayableStatus;

  transaction: Transaction;
}

export class Payable extends Entity<IPayable> {

  constructor(props: IPayable, id?: string) {
    super(props, id);
  }

  static create(props: IPayable, id?: string): Either<null, Payable> {
    const payable = new Payable(props, id);

    return right(payable);
  }
}
import { Either, right } from '@root/core/logic/Either';
import { PaymentMethod, Transaction } from '@root/modules/transaction/domain/entities/transaction/transaction';

import { ITransactionRepository } from '@root/modules/transaction/domain/repositories/transaction-repository';

type ListManyTransactionRequest = {
  description?: string;
  payment_method: PaymentMethod;
  card_number: number;
  card_holder_name: string;
  card_expiration_date: Date;
  card_verification_code: number;
}

type ListManyTransactionResponse = Either<
  null,
  Transaction[]
>;

export class ListManyTransaction {
  constructor(
    private transactionRepository: ITransactionRepository,
  ) { }
  async execute(): Promise<ListManyTransactionResponse> {
    const transactions = await this.transactionRepository.findMany();

    return right(transactions);
  }
}
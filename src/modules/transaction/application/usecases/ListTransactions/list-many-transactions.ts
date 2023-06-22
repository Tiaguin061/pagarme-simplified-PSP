import { Either, right } from '@root/core/logic/Either';

import { ITransactionRepository } from '@root/modules/transaction/domain/repositories/transaction-repository';
import { Transaction } from '@root/modules/transaction/domain/entities/transaction/transaction';

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
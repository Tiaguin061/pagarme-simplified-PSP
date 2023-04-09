import { Transaction } from '@root/modules/transaction/domain/entities/transaction/transaction';
import { ITransactionRepository } from '@root/modules/transaction/domain/repositories/transaction-repository';

export class InMemoryTransactionRepository implements ITransactionRepository {
  private transactions: Transaction[] = [];

  async create(transaction: Transaction): Promise<Transaction> {
    this.transactions.push(transaction);

    return transaction;
  }

  async findMany(): Promise<Transaction[]> {
    return this.transactions;
  }

  async exists(card_number: number): Promise<Transaction> {
    const found = this.transactions.find(where => where.card_number.value === card_number);

    if (!found) return null;

    return found;
  }
}
import { Transaction } from '../entities/transaction/transaction';

export interface ITransactionRepository {
  create(transaction: Transaction): Promise<Transaction>;
  findAll(): Promise<Transaction[]>;
  exists(card_number: number): Promise<Transaction>;
}
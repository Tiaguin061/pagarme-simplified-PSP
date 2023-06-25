import { PaymentMethod, Transaction } from '@root/modules/transaction/domain/entities/transaction/transaction';

export type TransformForResponseTransactionMapper = {
  id: string;
  card_number: number;
  card_expiration_date: Date;
  card_holder_name: string;
  card_verification_code: number;
  payment_method: PaymentMethod;
  value: number;
  description: string;
}

export class TransactionMapper {
  static transformForResponse(
    transaction: Transaction,
    omit?: Partial<{ [K in keyof TransformForResponseTransactionMapper]: boolean }>
  ): TransformForResponseTransactionMapper {
    let response = {
      id: transaction.id,
      card_number: transaction.card_number.value,
      card_expiration_date: transaction.card_expiration_date,
      card_holder_name: transaction.card_holder_name,
      card_verification_code: transaction.card_verification_code,
      payment_method: transaction.payment_method,
      value: transaction.value,
      description: transaction.description,
    };

    for (const key in omit) {
      if (omit[key]) {
        delete response[key];
      }
    }

    return response;
  }
}
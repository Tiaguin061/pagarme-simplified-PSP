import { Transaction } from '@root/modules/transaction/domain/entities/transaction/transaction'

export class TransactionMapper {
  static transformForResponse(transaction: Transaction) {
    return {
      id: transaction.id,
      card_number: transaction.card_number.value,
      card_expiration_date: transaction.card_expiration_date,
      card_holder_name: transaction.card_holder_name,
      card_verification_code: transaction.card_verification_code,
      payment_method: transaction.payment_method,
      value: transaction.value,
      description: transaction.description,
    }
  }
}
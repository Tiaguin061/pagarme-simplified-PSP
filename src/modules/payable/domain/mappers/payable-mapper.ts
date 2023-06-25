import { Payable, PayableStatus } from '@root/modules/payable/domain/entities/payable';
import { TransactionMapper, TransformForResponseTransactionMapper } from '@root/modules/transaction/domain/mappers/transaction-mapper';

export type TransformForResponsePayableMapper = {
  id: string;
  payment_date: Date;
  status: PayableStatus;
  transaction_id: string;
  transaction: TransformForResponseTransactionMapper;
}

export class PayableMapper {
  static transformForResponse(
    payable: Payable,
    omit?: Partial<{ [K in keyof TransformForResponsePayableMapper]: boolean }>
  ): TransformForResponsePayableMapper {
    let response = {
      id: payable.id,
      payment_date: payable.payment_date,
      status: payable.status,
      transaction_id: payable.transaction_id,
      transaction: TransactionMapper.transformForResponse(payable.transaction),
    };

    for (const key in omit) {
      if (omit[key]) {
        delete response[key];
      }
    }

    return response;
  }
}
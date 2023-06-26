import { IPayableRepository } from '@root/modules/payable/domain/repositories/payable-repository';
import { ListBalance } from '@root/modules/payable/application/usecases/ListBalance/list-balance';
import { ListBalanceController } from '@root/modules/payable/application/usecases/ListBalance/list-balance.controller';

export function listBalanceFactory(
  payableRepository: IPayableRepository,
) {
  const listBalance = new ListBalance(payableRepository);

  const listBalanceController = new ListBalanceController(
    listBalance,
  );

  return listBalanceController;
}
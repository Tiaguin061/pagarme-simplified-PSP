import { Router } from 'express';
import { payablesRouter } from '@root/modules/payable/infra/http/routes/payables.routes';
import { transactionsRouter } from '@root/modules/transaction/infra/http/routes/transactions.routes';

export const router = Router()

router.use('/transactions', transactionsRouter);
router.use('/payables', payablesRouter);
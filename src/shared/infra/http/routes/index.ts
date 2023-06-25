import { Router } from 'express';
import { transactionsRouter } from '@root/modules/transaction/infra/http/routes/transactions.routes';

export const router = Router()

router.use('/transactions', transactionsRouter);
import { Router } from 'express';
import { Payment, paymentModel } from '../models/Payment';
import { v4 as uuidv4 } from 'uuid';

const paymentRouter = Router();

paymentRouter.post('/payment', async (req, res) => {
    const paymentRequest: Omit<Payment, 'RequestId'> = req.body;
    const payment = new paymentModel({ ...paymentRequest, RequestId: uuidv4() });
    await payment.save();
    return res.status(201).json({ RequestId: payment.RequestId, Amount: payment.Amount });
});

export default paymentRouter;

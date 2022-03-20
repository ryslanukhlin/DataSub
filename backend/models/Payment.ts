import { Schema, model } from 'mongoose';

const paymentSchema = new Schema({
    RequestId: {
        type: String,
        required: true,
        unique: true,
    },
    CardNumber: {
        type: Number,
        required: true,
    },
    ExpirationDate: {
        type: String,
        required: true,
    },
    CVV: {
        type: Number,
        required: true,
    },
    Amount: {
        type: Number,
        required: true,
    },
});

export const paymentModel = model<Payment>('payment', paymentSchema);

export type Payment = {
    RequestId: string;
    CardNumber: number;
    ExpirationDate: string;
    CVV: number;
    Amount: number;
};

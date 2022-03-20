import { json } from 'body-parser';
import express from 'express';
import { connect } from 'mongoose';
import paymentRouter from './router/payment';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(json());
app.use(paymentRouter);
const PORT = 8000;

connect(
    'mongodb://root:root@localhost:27017',
    {
        autoCreate: true,
    },
    () => console.log('db connect'),
);

app.listen(PORT, () => {
    console.log('server start');
});

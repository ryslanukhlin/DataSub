import { TextField, Button, Alert, Snackbar } from '@mui/material';
import useInputValidate from '../hooks/InputValidate';
import InputMask from 'react-input-mask';
import { useEffect, useState, useRef } from 'react';
import { paymentRequest } from '../request/payment';

const Form = () => {
    const initial = useRef(true);
    const [success, setSuccess] = useState<boolean>();
    const [valid, setValid] = useState(false);
    const [number, setNumber, validNumber, setValidNumber, defNumber] = useInputValidate('');
    const [date, setDate, validDate, setValidDate, defDate] = useInputValidate('');
    const [cvv, setCvv, validCvv, setValidCvv, defCvv] = useInputValidate('');
    const [amount, setAmount, validAmount, setValidAmout, defAmount] = useInputValidate('');

    const clearInput = () => {
        defNumber();
        defDate();
        defCvv();
        defAmount();
        setValidNumber(false);
        setValidDate(false);
        setValidCvv(false);
        setValidAmout(false);
    };

    useEffect(() => {
        if (!initial.current) {
            if (number.replace(/_/g, '').length !== 19) {
                setValidNumber(true);
                setValid(false);
                return;
            } else setValidNumber(false);
            if (date.replace(/_/g, '').length !== 7) {
                setValidDate(true);
                setValid(false);
                return;
            } else setValidDate(false);
            if (cvv.replace(/_/g, '').length !== 3) {
                setValidCvv(true);
                setValid(false);
                return;
            } else setValidCvv(false);
            if (Number(amount) === 0) {
                setValidAmout(true);
                setValid(false);
                return;
            } else setValidAmout(false);
            setValid(true);
        } else initial.current = false;
    }, [number, date, cvv, amount]);

    const toPay = async () => {
        const isRequestSuccess = await paymentRequest(
            +number.replaceAll(' ', ''),
            date,
            +cvv,
            +amount,
        );
        if (isRequestSuccess) {
            initial.current = true;
            clearInput();
        }
        setSuccess(isRequestSuccess);
    };

    return (
        <>
            <Snackbar open={success} autoHideDuration={6000} onClose={setSuccess.bind(null, false)}>
                <Alert
                    onClose={setSuccess.bind(null, false)}
                    severity="success"
                    sx={{ width: '100%' }}>
                    This is a success message!
                </Alert>
            </Snackbar>
            <InputMask mask="9999 9999 9999 9999" value={number} onChange={setNumber}>
                {() => (
                    <TextField
                        error={validNumber}
                        helperText={validNumber && 'invalid format'}
                        className="input"
                        fullWidth
                        label="Card Number"
                        variant="outlined"
                    />
                )}
            </InputMask>
            <InputMask mask="99/9999" value={date} onChange={setDate}>
                {() => (
                    <TextField
                        error={validDate}
                        helperText={validDate && 'invalid format'}
                        className="input"
                        fullWidth
                        label="Expiration Date"
                        variant="outlined"
                    />
                )}
            </InputMask>
            <InputMask mask="999" value={cvv} onChange={setCvv}>
                {() => (
                    <TextField
                        error={validCvv}
                        helperText={validCvv && 'invalid format'}
                        className="input"
                        fullWidth
                        label="CVV"
                        variant="outlined"
                    />
                )}
            </InputMask>
            <TextField
                value={amount}
                onChange={setAmount}
                error={validAmount}
                helperText={validAmount && 'invalid format'}
                className="input"
                fullWidth
                label="Amount"
                variant="outlined"
                type="number"
                inputProps={{ pattern: '[0-9]*', min: 0 }}
            />
            <Button onClick={toPay} disabled={!valid} variant="contained" size="large">
                to pay
            </Button>
        </>
    );
};

export default Form;

const uri = 'http://localhost:8000/payment';

export const paymentRequest = async (
    CardNumber: number,
    ExpirationDate: string,
    CVV: number,
    Amount: number,
) => {
    const request = await fetch(uri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ CardNumber, ExpirationDate, CVV, Amount }),
    });
    return request.status === 201;
};

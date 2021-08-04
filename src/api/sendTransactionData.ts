import axios from 'axios';

export const sendTransactionData = async (fromAddress: string, toAddress: string, transactionAmount: string) => {
    try {
        const { data: response } = await axios.post(
            `http://jobcoin.gemini.com/splatter-washtub/api/transactions?fromAddress=${fromAddress}&toAddress=${toAddress}&amount=${transactionAmount}`
        );

        console.log(response);
    } catch (err) {
        console.error(err);
    }

}
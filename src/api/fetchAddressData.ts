import axios from 'axios';

export interface IAddressApiResponse {
    balance: string;
    transactions: ITransactionsAPIResponse[];
}

export interface ITransactionsAPIResponse {
    timestamp: string;
    fromAddress?: string | null;
    toAddress: string;
    amount: string;
}

export const fetchAddressData = async (accountName: string) => {
    try {
        const { data: response } = await axios.get<IAddressApiResponse>(
            `http://jobcoin.gemini.com/splatter-washtub/api/addresses/${accountName}`
        );
     
        const accountBalance = response.balance;

        const accountTransactions = response.balance;
    
        console.log(accountBalance);
        console.log(accountTransactions);
        
        return response;    
    } catch (err) {
        console.error(err);
    }

}
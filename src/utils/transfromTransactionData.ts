import React from 'react';
import { ITransactionsAPIResponse } from '../api/fetchAddressData';

export interface IBalanceOverTime {
    date: string;
    balance: number;
    transactionCount: number;
}

function TransformTransactionData(accountName: string, transactions: ITransactionsAPIResponse[]) {

    if (Array.isArray(transactions)) {
        const dates = transactions.map(transaction => {
            const timestamp = transaction.timestamp;
            const toAddress = transaction.toAddress;
            const amount = transaction.amount;
            const localTimeStamp = new Date(timestamp).toLocaleDateString()
            return { localTimeStamp, toAddress, amount };
        });

        let balanceOverTime: IBalanceOverTime[] = [{ date: dates[0].localTimeStamp, balance: parseFloat(dates[0].amount), transactionCount: 1 }];

        const transactionCount: number = dates.length;

        // for loop through list of transactions
        for (let i: number = 1; i < transactionCount; i++) {
            // checks if the data already exists in the array of objects
            if (balanceOverTime.find(elem => elem.date === dates[i].localTimeStamp)) {
                // checks if the transaction was a credit (positive value) against balance and adds 1 transaction count
                if (dates[i].toAddress === accountName) {
                    let elemIndex = balanceOverTime.findIndex((elem) => elem.date === dates[i].localTimeStamp);
                    let newBalance = balanceOverTime[elemIndex].balance += parseFloat(dates[i].amount);
                    balanceOverTime[elemIndex].balance = newBalance;
                    balanceOverTime[elemIndex].transactionCount += 1;
                } else { // determines the transaction was a debit (negative value) against balance and adds 1 transaction count
                    let elemIndex = balanceOverTime.findIndex(elem => elem.date == dates[i].localTimeStamp);
                    let newBalance = balanceOverTime[elemIndex].balance - parseFloat(dates[i].amount);
                    balanceOverTime[elemIndex].balance = newBalance;
                    balanceOverTime[elemIndex].transactionCount += 1
                }
            } else // determines the data's date does not exists in the array of objects
                if (dates[i].toAddress === accountName) { // checks if the transaction was a credit (positive value) against balance and adds 1 transaction count
                    let balanceOnDate = balanceOverTime[balanceOverTime.length - 1].balance + parseFloat(dates[i].amount);
                    balanceOverTime.push({ date: dates[i].localTimeStamp, balance: balanceOnDate, transactionCount: 1 });
                } else { // determines the transaction was a debit (negative value) against balance and adds 1 transaction count
                    let balanceOnDate = balanceOverTime[balanceOverTime.length - 1].balance - parseFloat(dates[i].amount);
                    balanceOverTime.push({ date: dates[i].localTimeStamp, balance: balanceOnDate, transactionCount: 1 });
                }
        }

        return balanceOverTime;
    }
}

export default TransformTransactionData;
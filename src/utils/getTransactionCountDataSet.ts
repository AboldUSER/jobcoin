import React from 'react';
import IValidateDataSet from '../components/graph-component'

interface IValidateDataSet {
  date: string;
  balance: number;
  transactionCount: number;
}

function GetTransactionCountDataSet(month: Number, firstDayOfMonth: Date, firstDayOfMonthCheck: boolean, daysInMonth: number, validatedbalanceOverTime: IValidateDataSet[]) {

let transactionCountDataSet: number[] = [];

const currentYear = new Date().getFullYear();

  // creates an array of any transction dataset entries that exist before the first day of the month
  const previousBalanceDataSetEntries = validatedbalanceOverTime.filter((transaction) => {
    return (Number(new Date(transaction.date)) < Number(firstDayOfMonth))
  });


// checks if the first day of the selected month is smaller than the first entry in the transction dataset
(firstDayOfMonthCheck) ? 
// if the firstday of month is smaller, both balance and count dataset first entries are set to zero
transactionCountDataSet[0] = 0: 
// if the first day of month is larger, both balance and count dataset first entries are set to last entries of transaction dataset
// really this should set to the entries the are smaller yet closest to the first day of the month
transactionCountDataSet[0] = previousBalanceDataSetEntries[previousBalanceDataSetEntries.length - 1].transactionCount;

      // for remaining days of month, determine if that specific date is in the transaction dataset
      for (let i = 1; i < daysInMonth; i++) {
        validatedbalanceOverTime.findIndex((vTransactionCount, ind) => {
            (Number(new Date(vTransactionCount.date)) == Number(new Date(currentYear, Number(month), i))) ?
            // if the data i is in the transaction dataset, set the count data set to that transaction dataset's entry's count 
            transactionCountDataSet[i - 1] = validatedbalanceOverTime[ind].transactionCount
            // console.log(vTransactionCount, ind)
            
            // if the data i is not in the transaction dataset, set the count data to the previous entry
            : transactionCountDataSet[i] = 0;
            return ind;
      })
      }
      return transactionCountDataSet;
    }

    export default GetTransactionCountDataSet;
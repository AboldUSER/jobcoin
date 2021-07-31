import React, { useState, createContext } from 'react';
import { Line } from "react-chartjs-2";
import GetDaysInMonth from '../utils/getDaysInMonth';
import { ITransactionsAPIResponse } from '../api/fetchAddressData';
import TransformTransactionData, { IBalanceOverTime } from '../utils/transfromTransactionData';
import GetTransactionCountDataSet from '../utils/getTransactionCountDataSet';

interface IGraphProps {
  month: number | unknown;
  accountName: string;
  transactions: ITransactionsAPIResponse[];
}

interface IValidateDataSet {
  date: string;
  balance: number;
  transactionCount: number;
}

export default function GraphComponent({ month, accountName, transactions }: IGraphProps) {

  const currentYear = new Date().getFullYear();
  const daysInMonth = GetDaysInMonth(Number(month), currentYear)

  const balanceOverTime = TransformTransactionData(accountName, transactions);

  function validatebalanceOverTime(balanceOverTime: IValidateDataSet[]) {
    return balanceOverTime;
  }

  const validatedbalanceOverTime = validatebalanceOverTime(balanceOverTime as IValidateDataSet[]);

  const labelsCreator = () => {

    let labels: string[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      labels.push(i.toString());
    }
    return labels
  }

  const firstDayOfMonth = new Date(currentYear, Number(month))

  const firstDayOfMonthCheck: boolean = firstDayOfMonth < new Date(validatedbalanceOverTime[0].date) ? true : false;

  let balanceDataSet: number[] = [];
  let transactionCountDataSet: number[] = [];

  //   creates an array of any transction dataset entries that exist before the first day of the month
  const previousBalanceDataSetEntries = validatedbalanceOverTime.filter((transaction) => {
    return (Number(new Date(transaction.date)) < Number(firstDayOfMonth))
  });

  const calandarDayAgainstCurrentDay = (day: number) => {
    const calendarDay = new Date(currentYear, Number(month), day);
    const currentDay = new Date();
    console.log(Number(calendarDay), Number(currentDay));
    return (calendarDay > currentDay) ? true : false;
  }


  // checks if the first day of the selected month is smaller than the first entry in the transction dataset
  const setBalanceDataSetFirstEntry = firstDayOfMonthCheck ?
    // if the firstday of month is smaller, both balance and count dataset first entries are set to zero
    balanceDataSet[0] = NaN :
    // if the first day of month is larger, both balance and count dataset first entries are set to last entries of transaction dataset
    // really this should set to the entries the are smaller yet closest to the first day of the month
    balanceDataSet[0] = previousBalanceDataSetEntries[previousBalanceDataSetEntries.length - 1].balance;


  const setTransactionCountDataSetFirstEntry = (firstDayOfMonthCheck) ?
    // if the firstday of month is smaller, both balance and count dataset first entries are set to zero
    transactionCountDataSet[0] = NaN :
    // if the first day of month is larger, both balance and count dataset first entries are set to last entries of transaction dataset
    // really this should set to the entries the are smaller yet closest to the first day of the month
    transactionCountDataSet[0] = previousBalanceDataSetEntries[previousBalanceDataSetEntries.length - 1].transactionCount;

  const bDates = validatedbalanceOverTime.map((el) => {
    const bDate = el.date;
    return bDate;
  });

  const bBalances = validatedbalanceOverTime.map((el) => {
    const bBalance = el.balance;
    return bBalance;
  });

  const bCounts = validatedbalanceOverTime.map((el) => {
    const bCount = el.transactionCount;
    return bCount;
  });

  const daysOfMonth = labelsCreator().map((el) => {
    const day = new Date(currentYear, Number(month), Number(el)).toLocaleDateString();
    return day;
  });

  for (let i = 1; i < daysOfMonth.length; i++) {
    const bConfirm = bDates.indexOf(daysOfMonth[i])
    if (bConfirm >= 0) {
      balanceDataSet[i] = bBalances[bConfirm];
    } else if (!calandarDayAgainstCurrentDay(i+1)) {
      balanceDataSet[i] = balanceDataSet[i - 1]
    } else {
      balanceDataSet[i] = NaN;
    }
  }

  for (let i = 1; i < daysOfMonth.length; i++) {
    const bConfirm = bDates.indexOf(daysOfMonth[i])
    if (bConfirm >= 0) {
      transactionCountDataSet[i] = bCounts[bConfirm];
    } else if (calandarDayAgainstCurrentDay(i+1)) {
      transactionCountDataSet[i] = NaN;}
    // } else if (transactionCountDataSet[i - 1] == NaN) {
    //   transactionCountDataSet[i] = 0;
    // } else 
    // transactionCountDataSet[i] = NaN;
  }

  const data = {
    labels: labelsCreator(),
    datasets: [
      {
        label: "Balance",
        data: balanceDataSet,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },
      {
        label: "Transactions",
        data: transactionCountDataSet,
        fill: false,
        borderColor: "#742774"
      }
    ]
  };

  return (
    <div >
      <Line data={data} />
    </div>
  );
}
import React from 'react';
import { Line } from "react-chartjs-2";
import { ITransactionsAPIResponse } from '../../api/fetchAddressData';
import TransformTransactionData from '../../utils/transfromTransactionData';

interface IGraphProps {
  month: number | unknown;
  year: number | unknown;
  accountName: string;
  transactions: ITransactionsAPIResponse[];
}

interface IValidateDataSet {
  date: string;
  balance: number;
  transactionCount: number;
}

export default function GraphComponent({ month, year, accountName, transactions }: IGraphProps) {

  // Create day of selected month labels for graph
  const labelsCreator = () => {
    const daysInMonth = new Date(Number(year), Number(month) + 1, 0).getDate();
    let labels: string[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      labels.push(i.toString());
    }
    return labels
  }

  // Creates an array containing each day of the selected month
  const daysOfMonth = labelsCreator().map((el) => {
    const day = new Date(Number(year), Number(month), Number(el)).toLocaleDateString();
    return day;
  });

  // Creates arrays that will provide the graph daily balance and transaction data
  let balanceDataSet: number[] = [];
  let transactionCountDataSet = [];

  // Creates object of daily account balance & transaction count
  const balanceOverTime = TransformTransactionData(accountName, transactions);

  //function and variable are used to ensure object cannot be read as undefined
  function validatebalanceOverTime(balanceOverTime: IValidateDataSet[]) {
    return balanceOverTime;
  }
  const validatedbalanceOverTime = validatebalanceOverTime(balanceOverTime as IValidateDataSet[]);

  // Checks if the first day of the month occurs before the first recorded daily balance/transaction
  const firstDayOfMonth = new Date(Number(year), Number(month))
  const firstDayOfMonthCheck: boolean = firstDayOfMonth < new Date(validatedbalanceOverTime[0].date) ? true : false;

  // Checks and returns if there was a balance and transaction on a day prior to the first day of current selected month
  const previousBalanceDataSetEntries = validatedbalanceOverTime.filter((transaction) => {
    return (Number(new Date(transaction.date)) < Number(firstDayOfMonth))
  });

  firstDayOfMonthCheck ?
    // If the firstday of month is smaller than first recorded transactoin, balance array's first entry is set to NaN
    balanceDataSet[0] = NaN :
    // If the first day of month is larger, balance array's first entry is set to balance of the previous recorded balance closest to the first day of current selected month
    balanceDataSet[0] = previousBalanceDataSetEntries[previousBalanceDataSetEntries.length - 1].balance;

  // Checks if a day of the month is after the current date (to be used in setting remaining data for the balanceDataSet array)
  const calendarDayAgainstCurrentDay = (day: number) => {
    const calendarDay = new Date(Number(year), Number(month), day);
    const currentDay = new Date();
    return (calendarDay > currentDay) ? true : false;
  }

  // Creates an array of only daily dates from the account's transformed transaction data object
  const bDates = validatedbalanceOverTime.map((el) => {
    const bDate = el.date;
    return bDate;
  });

  // Creates an array of only daily balance from the account's transformed transaction data object
  const bBalances = validatedbalanceOverTime.map((el) => {
    const bBalance = el.balance;
    return bBalance;
  });

  // Creates an array of only daily transaction count from the account's transformed transaction data object
  const bCounts = validatedbalanceOverTime.map((el) => {
    const bCount = el.transactionCount;
    return bCount;
  });

  // Provides balance data for the balance array, to be used in the graph
  for (let i = 1; i < daysOfMonth.length; i++) {
    const bConfirm = bDates.indexOf(daysOfMonth[i])
    if (bConfirm >= 0) {
      balanceDataSet[i] = bBalances[bConfirm];
    } else if (!calendarDayAgainstCurrentDay(i + 1)) {
      balanceDataSet[i] = balanceDataSet[i - 1]
    } else {
      balanceDataSet[i] = NaN;
    }
  }

  // Provides transaction count data for the transaction count array, to be used in the graph
  for (let i = 0; i < daysOfMonth.length; i++) {
    const bConfirm = bDates.indexOf(daysOfMonth[i])
    if (bConfirm >= 0) {
      transactionCountDataSet[i] = bCounts[bConfirm];
    } else if (balanceDataSet[i] >= 0) {
      transactionCountDataSet[i] = 0;
    } else {
      transactionCountDataSet[i] = null;
    }
  }

  // Graph data config
  const data = {
    labels: labelsCreator(),
    datasets: [
      {
        label: "Balance",
        yAxisID: 'A',
        data: balanceDataSet,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "#4bc0c0"
      },
      {
        label: "Transactions",
        yAxisID: 'A',
        data: transactionCountDataSet,
        fill: false,
        borderColor: "#742774"
      }
    ]
  };

  // Graph axis config
  const options = {
    animation: { duration: 0 },
    scales: {
      A: {
        type: 'linear',
        position: 'left',
        beginAtZero: true,
        ticks: {
          font: {
            weight: 'bold'
          }
        }
      },
    }
  }

  return (
    <div >
      <Line data={data} options={options} />
    </div>
  );
}
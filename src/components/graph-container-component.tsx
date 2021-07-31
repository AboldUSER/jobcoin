import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import GraphComponent from './graph-component';
import DateSelector from './date-selector-component';
import { ITransactionsAPIResponse } from '../api/fetchAddressData';

interface IGraphContainerProps {
    accountName: string;
    transactions: ITransactionsAPIResponse[];
}

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        color: '#363533',
        backgroundColor: '#d9e4dd',
        height: "100%",
        maxWidth: '90%',
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
    },
}));

const GraphContainerComponent = ({accountName, transactions}:IGraphContainerProps) => {


    const classes = useStyles();

    const [selectedMonth, setSelectedMonth] = React.useState<number | unknown>(new Date().getMonth());

    const updateMonth = (month: number | unknown): void => {
        setSelectedMonth(month)
    }

    return (
        <div>
            <Card className={classes.root}>
                <DateSelector updateMonth={updateMonth} />
                <CardContent><h2>Transaction & Balance History</h2>
                    <GraphComponent month={selectedMonth} accountName={accountName} transactions={transactions}/>
                </CardContent>
            </Card>
        </div>
    )

}

export default GraphContainerComponent;
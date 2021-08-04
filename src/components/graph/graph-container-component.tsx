import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import GraphComponent from './graph-component';
import MonthSelector from './month-selector-component';
import YearSelector from './year-selector-component';
import { ITransactionsAPIResponse } from '../../api/fetchAddressData';

interface IGraphContainerProps {
    accountName: string;
    transactions: ITransactionsAPIResponse[];
}

export const GraphContext = React.createContext({
    month: Number,
    setSelectedMonth: Function,
    year: Number,
    setYear: Function
});

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        minWidth: 300,
        color: '#363533',
        backgroundColor: '#d9e4dd',
        height: "100%",
        maxWidth: '90%',
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
    }, monthSelectorItem: {
        marginLeft: 'auto',
    }, yearSelectorItem: {
        marginRight: 'auto',
    }
}));

const GraphContainerComponent = ({ accountName, transactions }: IGraphContainerProps) => {

    const classes = useStyles();

    const [selectedMonth, setSelectedMonth] = React.useState<number | unknown>(new Date().getMonth());

    const updateMonth = (month: number | unknown): void => {
        setSelectedMonth(month)
    }

    const [selectedYear, setSelectedYear] = React.useState<number | unknown>(new Date().getFullYear());

    const updateYear = (year: number | unknown): void => {
        setSelectedYear(year)
    }

    return (
        <div>
            <Card className={classes.root}>
                <Grid container spacing={3} wrap='wrap'>
                    <Grid item className={classes.monthSelectorItem}>
                        <MonthSelector updateMonth={updateMonth} selectedYear={selectedYear} />
                    </Grid>
                    <Grid item className={classes.yearSelectorItem} >
                        <YearSelector updateYear={updateYear} />
                    </Grid>
                </Grid>
                <CardContent><h2>Transaction & Balance History</h2>
                    <GraphComponent month={selectedMonth} year={selectedYear} accountName={accountName} transactions={transactions} />
                </CardContent>
            </Card>
        </div>
    )

}

export default GraphContainerComponent;
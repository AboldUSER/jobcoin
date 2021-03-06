import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

interface ITokenBalanceProps {
    balance: string;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        minWidth: 275,
        color: '#363533',
        backgroundColor: '#d9e4dd',
        height: "100%",
        maxWidth: 300,
        display: 'flex',
        flexDirection: 'column',
    },
    button: {
        flex: '1 auto auto',
        maxWidth: 150,
        margin: 10,
    },
}));

const TokenBalanceComponent = ({ balance }: ITokenBalanceProps) => {

    const classes = useStyles();

    return (
        <div>
            <Card className={classes.root}>
                <CardContent><h2>Token Balance</h2>
                    <h4>{parseFloat(balance).toFixed(2)}</h4></CardContent>
            </Card>
        </div>
    )
}

export default TokenBalanceComponent;
import React from 'react';
import { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { sendTransactionData } from '../api/sendTransactionData';
import { useQueryClient } from 'react-query';

interface ITokenTransferProps {
    accountName: string;
}


const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        color: '#363533',
        backgroundColor: '#d9e4dd',
        height: "100%",
        maxWidth: 300,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    textField: {
        margin: 5,
        "& .MuiInputBase-root": {
            color: '#001554',
            height: 60
        }
    },
    button: {
        flex: '1 auto auto',
        maxWidth: 150,
        margin: 10,
        backgroundColor: '#001554',

    },
}));

const TokenTransferComponent = (props: ITokenTransferProps) => {

    const queryClient = useQueryClient();

    const classes = useStyles();

    const [transactionInputs, setTransactionInputs] = useState({ 'destAddress': '', 'sendAmount': '' });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setTransactionInputs({
            ...transactionInputs, [event.target.name]:
                event.target.value
        });
    }

    function isNumeric(num: any){
        return !isNaN(num)
      }

    const handleClick = async (event: any) => {
        event.preventDefault();
        

        try {
            const { data: response } = await sendTransactionData(props.accountName, transactionInputs.destAddress, transactionInputs.sendAmount);
            await queryClient.refetchQueries(['addressData']);
            setTransactionInputs({ 'destAddress': '', 'sendAmount': '' })
        } catch (err) {
            console.error(err);
            const numberCheck = isNumeric(transactionInputs.sendAmount);

        if (!numberCheck) {
            alert('Please enter a valid number amount into Send field');
        } else
            alert('Not enough funds!');
        }
    }

    return (
        <div>
            <Card className={classes.root}>
                <CardContent><h2>Send Jobcoin</h2></CardContent>
                <CardContent>

                    <form autoComplete="off">
                        <TextField className={classes.textField} id="destination-address" name='destAddress' label="Destination Address" variant="outlined" value={transactionInputs.destAddress} required onChange={handleChange} />
                        <TextField className={classes.textField} id="transfer-amount" name='sendAmount' label="Amount to Send" variant="outlined" value={transactionInputs.sendAmount} required onChange={handleChange} />
                        <Button className={classes.button} variant="contained" color="primary" type='submit' onClick={handleClick}>
                            Send Jobcoins
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )

}

export default TokenTransferComponent;
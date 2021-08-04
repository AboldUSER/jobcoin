import React from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';
import { makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { UserContext } from './context/address-context-component';
import { IAddressApiResponse, fetchAddressData } from '../api/fetchAddressData';


interface IFormInputs {
    accountName: string;
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
        margin: 'auto',
    },

    button: {
        flex: '1 auto auto',
        maxWidth: 150,
        margin: 10,
        backgroundColor: '#001554',
    },
}));

const SignInComponent = (): any => {

    const classes = useStyles();

    const { address, setAddress } = React.useContext(UserContext);

    const history = useHistory();

    const [formInput, setFormInput] = React.useState<IFormInputs["accountName"]>('');

    const { data, refetch, remove } = useQuery<IAddressApiResponse | undefined>([`addressData`, address], async () => await fetchAddressData(formInput), { refetchOnWindowFocus: false, enabled: false });

    if (!data) {
    } else if (data && data.transactions.length === 0) {
        alert('Please enter valid and/or existing address')
        remove()
    } else {
        setAddress(formInput);
        history.push({ pathname: '/dashboard' });
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormInput(event.target.value);
    }

    const handleClick = async (e: any) => {
        e.preventDefault();

        refetch();

    }

    return (
        <div>
            <Card className={classes.root}>
                <CardContent>
                    <h3>Welcome!</h3>
                    <h3>Sign In With Your Jobcoin Address</h3>
                </CardContent>
                <CardContent>
                    <form autoComplete="off" >
                        <TextField id="account-name" label="Jobcoin Address" variant="outlined" value={formInput} required onChange={handleChange} />

                        <Button className={classes.button} variant="contained" color="primary" type='submit' onClick={handleClick}>
                            Sign In
                        </Button>

                    </form>
                </CardContent>
            </Card>
        </div>
    )

}

export default SignInComponent;
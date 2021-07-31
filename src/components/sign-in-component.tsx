import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';


interface IFormInputs {
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

const SignInComponent: React.FunctionComponent = (): any => {

    const history = useHistory();

    const classes = useStyles();

    const [formInput, setFormInput] = useState<IFormInputs["accountName"]>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormInput(event.target.value);
    }

    const handleClick = (e: any) => {
        e.preventDefault();



        history.push({pathname: '/dashboard', state: { accountAddress: formInput }});

    }

    return (
        <div>
            <Card className={classes.root}>
                <CardContent><h3>Welcome! Sign In With Your Jobcoin Address</h3></CardContent>
                <CardContent>
                    <form autoComplete="off" >
                        <TextField id="account-name" label="Jobcoin Address" variant="outlined" value={formInput} required onChange={handleChange} />
                        {/* <Route render={({ history }) => ( */}
                        <Button className={classes.button} variant="contained" color="primary" type='submit' onClick={handleClick}>
                            Sign In
                        </Button>
                        {/* )}/> */}
                    </form>
                </CardContent>
            </Card>
        </div>
    )

}

export default SignInComponent;
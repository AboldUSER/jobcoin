import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SignInComponent from '../components/sign-in-component';
import Logo from '../assets/images/logo.png';


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        justify: 'center',
        flexGrow: 1,
        spacing: 0,
        textAlign: 'center',
        justifyContent: 'center',
        padding: theme.spacing(5, 0, 0),
        margin: 'auto'
    }, grid: {
        width: "100%",
        paddingBottom: 2,
        margin: theme.spacing(3, 0),
    }
}));

const SignInPage: React.FunctionComponent = (): any => {

    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Grid className={classes.grid} >
                <img alt="" src={Logo} height='150px' width='150px' />
            </Grid>
            <Grid className={classes.grid}>
                <SignInComponent />
            </Grid>
        </Grid>
    )
}

export default SignInPage;
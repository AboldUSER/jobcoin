import React from 'react';
import {  makeStyles, Theme } from '@material-ui/core/styles';
import SignInComponent from '../components/sign-in-component';
import JCLogo from '../assets/images/logo.png';
import { Grid } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        justify: 'center',
        flexGrow: 1,
        spacing: 0,
        textAlign: 'center',
        justifyContent: 'center',
        padding: theme.spacing(20, 0, 20),
        margin: 'auto'
    }, grid: {
        width: "100%",
        paddingBottom: 2
    }
}));

const SignInPage: React.FunctionComponent = (): any => {

    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Grid className={classes.grid} >
            <img alt="" src={JCLogo} height='150px' width='150px'/>
            </Grid>
            <Grid className={classes.grid}>
            <SignInComponent />
            </Grid>
        </Grid>
    )
}

export default SignInPage;
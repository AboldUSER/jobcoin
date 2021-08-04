import React from 'react';
import { useQuery } from 'react-query';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import TokenBalanceComponent from '../components/token-balance-component';
import TokenTransferComponent from '../components/token-transfer-component';
import GraphContainerComponent from '../components/graph/graph-container-component';
import Header from '../components/header-component';
import { IAddressApiResponse, fetchAddressData } from '../api/fetchAddressData';
import { UserContext } from '../components/context/address-context-component';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: "100%",
            margin: 'auto',
            display: 'flex',
        },
        gridItem: {
            margin: theme.spacing(4, 'auto'),
        },
        gridSubItem: {
            margin: theme.spacing(6, 'auto'),
        }
    }),
);

const DashboardPage = () => {

    const classes = useStyles();

    const { address } = React.useContext(UserContext);

    const { isLoading, data, error } = useQuery<IAddressApiResponse | undefined>([`addressData`, address], async () => await fetchAddressData(address));

    if (isLoading) {
        return (
            <div>
                <Header />
                <Fade in={true} timeout={500}>
                    <h2>Checking for credentials</h2>
                </Fade>
            </div>
        )
    }

    if (error) {
        console.log(error);

    }

    if (!data) {

        return (
            <div>

                <Header />
                <Fade in={true} timeout={2000}>
                    <h2>Please Log In</h2>
                </Fade>
            </div>
        )
    } else {

        const addressBalance = data?.balance

        const addressTransactions = (data?.transactions) ? data.transactions : [];

        return (
            <div>

                <Header />
                <Fade in={true} timeout={2000}>
                    <Container className={classes.root}>
                        <Grid container spacing={3} wrap='wrap'>
                            <Grid className={classes.gridItem}
                                item lg={3}
                            >
                                <Grid >
                                    <TokenBalanceComponent balance={addressBalance} />
                                </Grid>
                                <Grid className={classes.gridSubItem}>
                                    <TokenTransferComponent accountName={address} />
                                </Grid>
                            </Grid>
                            <Grid
                                className={classes.gridItem}
                                item lg={9}
                            >
                                <GraphContainerComponent accountName={address} transactions={addressTransactions} />
                            </Grid>
                        </Grid>
                    </Container>
                </Fade>
            </div>
        )
    }
}

export default DashboardPage;
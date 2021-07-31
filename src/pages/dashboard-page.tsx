import React from 'react';
import { useLocation } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TokenBalanceComponent from '../components/token-balance-component';
import TokenTransferComponent from '../components/token-transfer-component';
import GraphContainerComponent from '../components/graph-container-component';
import Header from '../components/header-component';
import { IAddressApiResponse, fetchAddressData } from '../api/fetchAddressData';
import { useQuery } from 'react-query';
import Fade from '@material-ui/core/Fade';

interface IDashboardProps {
    accountAddress: string;
}

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
    }),
);

const DashboardPage: React.FC<IDashboardProps> = () => {


    const classes = useStyles();

    const location = useLocation();

    const accountObj = location.state as IDashboardProps;

    const initialAccount = accountObj.accountAddress;

    const [address, setAddress] = React.useState<string>(initialAccount);


    const { isLoading, data } = useQuery<IAddressApiResponse | undefined>([`addressData`, address], async () => await fetchAddressData(address));

    if (isLoading) {
        return <span><h2>Loading...</h2></span>
    }

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
                        <Grid className={classes.gridItem}>
                            <TokenBalanceComponent accountName={address} balance={addressBalance} />
                        </Grid>
                        <Grid className={classes.gridItem}>
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

export default DashboardPage;
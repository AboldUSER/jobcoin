import React from 'react';
import { useHistory } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Logo from '../assets/images/logo.png';
import { UserContext } from '../components/context/address-context-component';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appBar: {
      backgroundColor: '#4C5B87',
      "&.MuiAppBar-positionSticky": {
        margin: "40px 20px 0px 20px",
        width: "calc(100% - 40px)",
        "& .MuiToolbar-root": {
          color: "'#324376'",
          "& .MuiButtonBase-root": {
            fontSize: 24
          }
        }
      }
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    addressTitle: {
      marginLeft: 15,
    },
    logo: {
      maxWidth: 50,
    },
    toolbarButtons: {
      marginLeft: 'auto',
    },
    toolbarItems: {
      marginTop: 5,
    }

  }),
);

export default function ButtonAppBar() {

  const classes = useStyles();

  const history = useHistory();

  const { address, setAddress } = React.useContext(UserContext);

  const logInButtonStatus = (address === '' ? false : true);

  const logOutButtonStatus = (address === '' ? true : false);

  const handleClick = async (e: any) => {
    e.preventDefault();

    await setAddress('');

    history.push({ pathname: '/' });
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <img src={Logo} alt="logo" className={classes.logo} />
          <Typography variant="h5" className={classes.addressTitle}>
            Sender App
          </Typography>
          <div className={classes.toolbarButtons}>
            <Grid>{address !== '' &&
        <Typography className={classes.toolbarItems} >
        {address} signed in
      </Typography>
      }</Grid>
            <Button color="inherit" disabled={logInButtonStatus} onClick={handleClick}>Sign In</Button>
            <Button color="inherit" disabled={logOutButtonStatus} onClick={handleClick}>Sign Out</Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
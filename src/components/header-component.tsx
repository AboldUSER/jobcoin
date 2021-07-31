import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router-dom';
import Logo from '../assets/images/logo.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appBar: {
      backgroundColor: '#001554',
    "&.MuiAppBar-positionSticky": {
      margin: "40px 20px 0px 20px",
      width: "calc(100% - 40px)",
      "& .MuiToolbar-root": {
        color: "'#001554'",
        "& .MuiButtonBase-root": {
          fontSize: 24
    }}}},
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    logo: {
      maxWidth: 50,
    }
  }),
);

export default function ButtonAppBar() {

  const history = useHistory();

  const classes = useStyles();

  const handleClick = (e: any) => {
    e.preventDefault();

    history.push({pathname: '/'});
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <img src={Logo} alt="logo" className={classes.logo} />
          <Typography variant="h6" className={classes.title}>
            JobCoin
          </Typography>
          <Button color="inherit" onClick={handleClick}>Log Out</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
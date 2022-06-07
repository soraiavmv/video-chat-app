import React from 'react';
import { Typography, AppBar as MaterialAppBar } from '@material-ui/core';
import { useStyles } from './styles';

const AppBar = () => {
  const css = useStyles();
  return (
    <MaterialAppBar
      position='static'
      className={css.appBar}
    >
      <Typography
        variant='h2'
        className={css.typography}
      >
        VISTRAPP
      </Typography>
    </MaterialAppBar>
  );
}

export default AppBar;
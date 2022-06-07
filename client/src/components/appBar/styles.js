import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  appBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3DBBCD',
    borderRadius: 15,
    width: '600px',
    margin: '20px 100px',

    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  typography: {
    color: '#20939D',
    fontFamily: 'Pacifico, cursive'
  }
}));

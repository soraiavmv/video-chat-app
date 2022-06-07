import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  appBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#41B3A3',
    borderRadius: 15,
    width: '600px',
    margin: '20px 100px',
  },
  typography: {
    color: '#41B3A3',
    textShadow: '-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white'
  }
}));

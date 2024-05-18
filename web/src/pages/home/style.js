import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  addButton: {
    margin: theme.spacing(2),
  },
}));

export default useStyles;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: '10px 20px',
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

export default useStyles;

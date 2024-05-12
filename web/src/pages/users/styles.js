import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    pageContainer: {
        padding: theme.spacing(1),
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: '10px',
    },
    tabs: {
        color: 'white'
    },
    formControl: {
        backgroundColor: 'white',
        padding: '10px', 
        alignItems: 'center',
        justifyContent: 'center',
        display: 'grid',
    },
    formSelectControl: {
        maxWidth: '50vw',
        minWidth: '20vw',
    }
}));

export default useStyles;

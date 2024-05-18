import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    pageContainer: {
        padding: theme.spacing(1),
    },
    pageContainerViewAll: {
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
    },
    tabStyle: {
        maxHeight: '55vh',
        overflowY: 'auto',
    }
}));

export default useStyles;

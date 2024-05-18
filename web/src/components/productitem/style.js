import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
    margin: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
  },
  mediaContainer: {
    position: 'relative',
    width: 200,
    height: 200, // 4:3 aspect ratio
    overflow: 'hidden',
    aspectRatio: 'auto'
  },
  media: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

export default useStyles;

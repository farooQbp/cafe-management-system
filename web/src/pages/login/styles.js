import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url("https://wallpapers.com/images/high/cafe-background-a9tquohehoaxa4y8.webp")', // Replace 'path_to_your_image.jpg' with the actual path to your image
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100vh'
    },
    overlay: {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.3)', /* Adjust the alpha value for opacity */
      zIndex: 1
    },
    loginDiv: {
        display: 'flex',
        flexDirection: 'column',
        width: '30vw',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: '20px',
        zIndex: 2,
        borderRadius: '10px'
    }
}));

export default useStyles;

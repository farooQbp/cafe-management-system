import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { APP_MENU, APP_MENU_CUSTOMER, APP_MENU_MANAGER, LOGO } from '../../core/config/constants';
import { useNavigate } from 'react-router-dom';
import cafe from '../../store/cafe';

const CustomDrawer = ({ open, toggleDrawer }) => {
    const [appMenu, setAppMenu] = React.useState(APP_MENU_CUSTOMER)
    const navigate = useNavigate();
    const cafeStore = React.useContext(cafe)
    const handleOnItemClick = (item) => {
        navigate(`${item}`)
    }

    React.useEffect(() => {
        if (cafeStore.userName.length) {
            if (cafeStore.userName[0].USER_TYPE === 'Admin') setAppMenu(APP_MENU)
            else if (cafeStore.userName[0].USER_TYPE === 'Manager') setAppMenu(APP_MENU_MANAGER)
            else setAppMenu(APP_MENU_CUSTOMER)
        } else {
            setAppMenu(APP_MENU_CUSTOMER)
        }
    }, [cafeStore.userName])
    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <img src={LOGO} alt='logo' width={250} style={{ paddingTop: '20px', paddingBottom: '20px' }}/>
            <List>
                {appMenu.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton onClick={() => handleOnItemClick(item.path)}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText secondary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}

export default CustomDrawer;

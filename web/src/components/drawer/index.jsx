import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { APP_MENU, LOGO } from '../../core/config/constants';
import { useNavigate } from 'react-router-dom';

const CustomDrawer = ({ open, toggleDrawer }) => {
    const navigate = useNavigate();
    const handleOnItemClick = (item) => {
        navigate(`${item}`)
    }
    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <img src={LOGO} alt='logo' width={250} style={{ paddingTop: '20px', paddingBottom: '20px' }}/>
            <List>
                {APP_MENU.map((item, index) => (
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

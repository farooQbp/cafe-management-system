import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ViewAllUsers from './viewallusers';
import AddNewUser from './addnewuser';
import EditUser from './edituser';
import useStyles from './styles';
import { Typography } from '@mui/material';

const UserManagementPage = (props) => {
    const {
        users,
    } = props;
    const classes = useStyles();
    const [selectedTab, setSelectedTab] = useState(0);

    const handleChangeTab = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant='h5' textAlign='center' fontWeight={600}>User Management</Typography>
            <Tabs value={selectedTab} onChange={handleChangeTab} centered textColor="white" indicatorColor="primary">
                <Tab label="View All Users" sx={classes.tabs} />
                <Tab label="Add New User" />
                <Tab label="Edit User" />
            </Tabs>
            <TabPanel value={selectedTab} index={0}>
                <ViewAllUsers users={users} />
            </TabPanel>
            <TabPanel value={selectedTab} index={1}>
                <AddNewUser />
            </TabPanel>
            <TabPanel value={selectedTab} index={2}>
                <EditUser />
            </TabPanel>
        </Box>
    );
};

const TabPanel = ({ children, value, index }) => {
    const classes = useStyles();
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            className={classes.tabStyle}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </div>
    )
};

export default UserManagementPage;

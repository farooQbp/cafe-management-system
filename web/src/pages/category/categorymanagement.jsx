import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ViewAllCategory from './viewallcategory';
import AddNewCategory from './addnewcategory';
import useStyles from './styles';
import { Typography } from '@mui/material';

const CategoryManagementPage = (props) => {
    const {
        category,
    } = props;
    const classes = useStyles();
    const [selectedTab, setSelectedTab] = useState(0);

    const handleChangeTab = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant='h5' textAlign='center' fontWeight={600}>Category Management</Typography>
            <Tabs value={selectedTab} onChange={handleChangeTab} centered textColor="white" indicatorColor="primary">
                <Tab label="View All Category" sx={classes.tabs} />
                <Tab label="Add New Category" />
            </Tabs>
            <TabPanel value={selectedTab} index={0}>
                <ViewAllCategory category={category} />
            </TabPanel>
            <TabPanel value={selectedTab} index={1}>
                <AddNewCategory />
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

export default CategoryManagementPage;

import React, { useContext, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import OrderSummary from './ordersummary';
import ViewAllOrders from './vieworders';
import useStyles from './styles';
import { Divider, Stack, Switch, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CustomDateTimePicker from '../../components/datetimepicker';
import CustomButton from '../../components/button';
import CustomModal from '../../components/modal';
import cafeManagement from '../../store/cafe';
import { observer } from 'mobx-react-lite';

const OrderManagement = () => {
    const cafeStore = useContext(cafeManagement);
    const classes = useStyles();
    const [selectedTab, setSelectedTab] = useState(0);
    const [needStartDate, setNeedStartDate] = useState(false);
    const [needSettings, setNeedSettings] = useState(false);
    const currentDate = new Date();
    const [searchDate, setSearchDate] = useState({
        start: currentDate,
        end: currentDate,
        startDateRequire: !needStartDate,
    });

    const handleChangeTab = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const handleSearchOrders = () => {
        console.log('Search', searchDate)
    }

    const handleStartDateToggle = () => {
        setNeedStartDate((item) => !item)
        setSearchDate((item) => ({ ...item, startDateRequire: !needStartDate }))
    }

    const handleStartDateChange = (e) => {
        setSearchDate((item) => ({ ...item, start: e.$d }))
    }

    const handleEndDateChange = (e) => {
        setSearchDate((item) => ({ ...item, end: e.$d }))
    }


    const handleSettingsModal = () => (
        <CustomModal open={needSettings} onClose={openSettings}>
            <Stack direction='column' justifyContent='center' alignItems='center' spacing={2}>
                <Stack direction='row' spacing={2} justifyContent='center' alignItems='center'>
                    <Typography textAlign='center'>Require Start Date</Typography>
                    <Switch checked={needStartDate} color="secondary" onClick={handleStartDateToggle} />
                </Stack>
                <Stack direction='row' spacing={2} justifyContent='center'>
                    <CustomDateTimePicker label='Start Date' isDisabled={!needStartDate} onChange={handleStartDateChange} value={searchDate.start} />
                    <CustomDateTimePicker label='End Date' onChange={handleEndDateChange} value={searchDate.end} />
                    <CustomButton
                        aria-label="search order"
                        aria-haspopup="true"
                        onClick={handleSearchOrders}
                        variant='outline'
                    >
                        <SearchIcon style={{ color: 'black' }} />
                    </CustomButton>
                </Stack>
            </Stack>
        </CustomModal>
    )

    const openSettings = () => {
        setNeedSettings((item) => !item)
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant='h5' textAlign='center' fontWeight={600}>Order Management</Typography>
            {handleSettingsModal()}
            <CustomButton variant="outlined" onClick={openSettings}>Update Order Table</CustomButton>
            <Divider variant='middle' />
            <Tabs value={selectedTab} onChange={handleChangeTab} centered textColor="white" indicatorColor="primary">
                <Tab label="View All Orders" sx={classes.tabs} />
                <Tab label="View Order Summary" />
            </Tabs>
            <TabPanel value={selectedTab} index={0}>
                <ViewAllOrders orders={cafeStore.allOrders} />
            </TabPanel>
            <TabPanel value={selectedTab} index={1}>
                <OrderSummary orders={cafeStore.allOrders} />
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

export default observer(OrderManagement);

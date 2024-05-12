import React, { useContext, useEffect } from 'react';
import useStyles from './styles';
import { observer } from 'mobx-react-lite';
import cafeManagement from '../../store/cafe';

const OrderSummary = ({ users }) => {
    const classes = useStyles();
    const cafeStore = useContext(cafeManagement);

    const fetchUsers = async () => {
        await cafeStore.fetchUsers();
    }

    useEffect(() => {
        fetchUsers();
        // eslint-disable-next-line
    }, [])

    return (
        <div className={classes.pageContainer}>
        </div>
    );
};

export default  observer(OrderSummary);

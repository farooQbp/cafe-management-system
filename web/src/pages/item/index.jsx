import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import cafeManagement from '../../store/cafe';
import ItemManagementPage from './itemmanagement';

const ItemDetails = () => {
    const cafeStore = useContext(cafeManagement);
    return (
        <>
            <ItemManagementPage items={cafeStore.items} />
        </>
    )
}

export default observer(ItemDetails);
import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import cafeManagement from '../../store/cafe';
import InventoryManagementPage from './inventorymanagement';

const InventoryDetails = () => {
    const cafeStore = useContext(cafeManagement);
    return (
        <>
            <InventoryManagementPage inventory={cafeStore.inventory} />
        </>
    )
}

export default observer(InventoryDetails);
import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import cafeManagement from '../../store/cafe';
import CategoryManagementPage from './categorymanagement';

const CategoryDetails = () => {
    const cafeStore = useContext(cafeManagement);
    return (
        <>
            <CategoryManagementPage category={cafeStore.categories} />
        </>
    )
}

export default observer(CategoryDetails);
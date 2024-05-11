import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import cafeManagement from '../../store/cafe';
import UserManagementPage from './usermanagement';

const UserDetails = () => {
    const cafeStore = useContext(cafeManagement);
    return (
        <>
            <UserManagementPage users={cafeStore.users} />
        </>
    )
}

export default observer(UserDetails);
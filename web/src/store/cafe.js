import react, { createContext } from 'react';
import { makeObservable, observable, action, toJS, configure } from 'mobx';
import { getAPI, postAPI, putAPI } from '../core/api';
import API_URL from '../core/config/api';

configure({
    enforceActions: 'never',
})

class cafeManagement {
    constructor() {
        makeObservable(this, {
            userType: observable,
            setUserType: action,
        });
    }

    userType = []
    setUserType = (type) => {
        this.userType = type;
    }
}

export default createContext(new cafeManagement())
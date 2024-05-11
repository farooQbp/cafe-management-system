import { createContext } from 'react';
import { makeObservable, observable, action, configure } from 'mobx';
import { getAPI, postAPI, putAPI } from '../core/api';
import API_URL from '../core/config/api';

configure({
    enforceActions: 'never',
})

class cafeManagement {
    constructor() {
        makeObservable(this, {
            // User Mangement functions
            fetchUserTypes: action,
            fetchUsers: action,
            addNewUser: action,
            updateUser: action,

            // Order Management functions
            addNewOrder: action,
            fetchCurrentOrder: action,

            // Item Management functions
            addNewItem: action,
            fetchAllItems: action,
            updateItem: action,

            // Ingredient Management functions
            addNewItemIngredient: action,
            fetchItemIngredient: action,

            // Category Management functions
            fetchCategories: action,
            addNewCategory: action,
            fetchDietoryPreference: action,
            fetchAvailableInventory: action,
            updateInventoryStatus: action,
            addNewInventory: action,
            handleSnackBar: action,


            // State Management
            showSnackbar: observable,
            setShowSnackbar: action,

            userType: observable,
            setUserType: action,

            users: observable,
            setUsers: action,
        });
    }

    // User API Management
    fetchUserTypes = () => {
        const response = getAPI(API_URL.USER_TYPES);
        if (response) {
            response.then((res) => {
                const userTypes = res.data.map((item) => ({ value: item.USER_TYPE_NAME, label: item.USER_TYPE_NAME }))
                this.setUserType(userTypes)
            }).catch((err) => {
                this.setUsers([])
                console.error(err)
            })
        }
        return response;
    }

    fetchUsers = () => {
        const response = getAPI(API_URL.USERS);
        if (response) {
            response.then((res) => {
                this.setUsers(res.data)
            }).catch((err) => {
                this.setUsers([])
                console.error(err)
            })
        }
        return response;
    }

    addNewUser = (payload) => {
        const response = postAPI(API_URL.USERS, payload);
        return response;
    }

    updateUser = (userID, payload) => {
        const response = putAPI(API_URL.USERS, userID, payload);
        return response;
    }

    // Order API Management
    addNewOrder = (payload) => {
        const response = postAPI(API_URL.ORDER, payload);
        return response;
    }

    fetchCurrentOrder = (orderID) => {
        const response = getAPI(API_URL.ORDER, orderID);
        return response;
    }

    // Item API Management
    addNewItem = (payload) => {
        const response = postAPI(API_URL.ADD_ITEM, payload);
        return response;
    }

    fetchAllItems = () => {
        const response = getAPI(API_URL.ITEMS);
        return response;
    }

    updateItem = (itemID, payload) => {
        const response = putAPI(API_URL.UPDATE_ITEM, itemID, payload);
        return response;
    }

    // Ingredient API Management
    addNewItemIngredient = (payload) => {
        const response = postAPI(API_URL.ADD_INGREDIENT, payload);
        return response;
    }

    fetchItemIngredient = (itemID) => {
        const response = getAPI(API_URL.ITEM_INGREDIENT, itemID);
        return response;
    }

    // Category API Management
    fetchCategories = () => {
        const response = getAPI(API_URL.CATEGORY_TYPES);
        return response;
    }

    addNewCategory = (payload) => {
        const response = postAPI(API_URL.USER_TYPES, payload);
        return response;
    }

    fetchDietoryPreference = () => {
        const response = getAPI(API_URL.DIETORY);
        return response;
    }

    fetchAvailableInventory = () => {
        const response = getAPI(API_URL.INVENTORY);
        return response;
    }

    updateInventoryStatus = (inventoyID, payload) => {
        const response = putAPI(API_URL.UPDATE_INVENTORY, inventoyID, payload);
        return response;
    }

    addNewInventory = (payload) => {
        const response = postAPI(API_URL.ADD_INVENTORY, payload);
        return response;
    }

    // Other Functions
    handleSnackBar = (type, message) => {
        this.setShowSnackbar({
            open: true,
            type: type, // warning, info, error, success
            message: message, 
        })
        setTimeout(() => {
            this.resetSnackbar();
        }, 3000)
    }

    //  State Management

    showSnackbar = {
        type: 'success',
        message: "Testing",
        open: false,
    }
    setShowSnackbar = (type) => {
        this.showSnackbar = type;
    }

    resetSnackbar = () => {
        this.showSnackbar = {
            ...this.showSnackbar,
            open: false,
        }
    }

    userType = []
    setUserType = (type) => {
        this.userType = type;
    }

    users = []
    setUsers = (type) => {
        this.users = type;
    }
}

export default createContext(new cafeManagement())
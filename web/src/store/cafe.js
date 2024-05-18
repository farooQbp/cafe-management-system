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

            userLoginAction: action,

            // User Mangement functions
            fetchUserTypes: action,
            fetchUsers: action,
            addNewUser: action,
            updateUser: action,

            // Order Management functions
            addNewOrder: action,
            fetchCurrentOrder: action,
            fetchOrderSummary: action,

            // Item Management functions
            addNewItem: action,
            fetchAllItems: action,
            updateItem: action,

            // Ingredient Management functions
            addNewItemIngredient: action,
            fetchItemIngredient: action,
            fetchAllItemIngredient: action,

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

            allOrders: observable,
            setAllOrders: action,

            categories: observable,
            setCategories: action,

            inventory: observable,
            setInventory: action,

            items: observable,
            setItems: action,

            dietory: observable,
            setDietory: action,
            
            cartItems: observable,
            updateCartItems: action,
            
            userName: observable,
            updateUserName: action,
            
            allIngredients: observable,
            updateAllIngredients: action,
        });
    }

    userLoginAction = async (userAPI) => {
        const response = await getAPI(API_URL.LOGIN, userAPI);
        return response;
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
        if (response) {
            response.then((res) => {
                orderID ? this.setUsers(res.data) : this.setAllOrders(res.data)
            }).catch((err) => {
                orderID ? this.setUsers([]) : this.setAllOrders([])
                console.error(err)
            })
        }
        return response;
    }

    fetchOrderSummary = (orderID) => {
        const response = postAPI(API_URL.ORDER_SUMMARY, orderID);
        return response;
    }

    // Item API Management
    addNewItem = (payload) => {
        const response = postAPI(API_URL.ADD_ITEM, payload);
        return response;
    }

    fetchAllItems = (payload) => {
        const response = postAPI(API_URL.ITEMS, payload);
        if (response) {
            response.then((res) => {
                this.setItems(res.data)
            }).catch((err) => {
                this.setItems([])
                console.error(err)
            })
        }
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

    
    fetchAllItemIngredient = () => {
        const response = getAPI(API_URL.ALL_ITEM_INGREDIENTS);
        return response;
    }

    // Category API Management
    fetchCategories = () => {
        const response = getAPI(API_URL.CATEGORY_TYPES);
        if (response) {
            response.then((res) => {
                const category = res.data.map((item) => ({ ...item, value: item.ID, label: item.NAME }))
                this.setCategories(category)
            }).catch((err) => {
                this.setCategories([])
                console.error(err)
            })
        }
        return response;
    }

    addNewCategory = (payload) => {
        const response = postAPI(API_URL.CATEGORY_TYPES, payload);
        return response;
    }

    fetchDietoryPreference = () => {
        const response = getAPI(API_URL.DIETORY);
        if (response) {
            response.then((res) => {
                const category = res.data.map((item) => ({ ...item, value: item.ID, label: item.NAME }))
                this.setDietory(category)
            }).catch((err) => {
                this.setDietory([])
                console.error(err)
            })
        }
        return response;
    }

    fetchAvailableInventory = () => {
        const response = getAPI(API_URL.INVENTORY);
        if (response) {
            response.then((res) => {
                this.setInventory(res.data)
            }).catch((err) => {
                this.setInventory([])
                console.error(err)
            })
        }
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

    allOrders = []
    setAllOrders = (orders) => {
        this.allOrders = orders;
    }

    categories = []
    setCategories = (category) => {
        this.categories = category;
    }

    inventory = []
    setInventory = (inventories) => {
        this.inventory = inventories;
    }

    items = []
    setItems = (inventories) => {
        this.items = inventories;
    }

    dietory = []
    setDietory = (inventories) => {
        this.dietory = inventories;
    }

    cartItems = {}
    updateCartItems = (items) => {
        this.cartItems = items;
    }

    userName = []
    updateUserName = (items) => {
        this.userName = items;
    }

    allIngredients = []
    updateAllIngredients = (items) => {
        this.allIngredients = items;
    }
}

export default createContext(new cafeManagement())
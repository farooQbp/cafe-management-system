const PAYLOAD_SAMPLE = {
    // User Management
    ADD_USER: {
        id: 1,
        name: '',
        email: '',
        password: '',
        type: 'Customer'
    },
    UPDATE_USER: 'userId',

    // Order Management
    ORDER_FILTER: { startDate: '2021-05-05', requireStart: true, endDate: '2024-05-19' },
    ORDER_PAYLOAD: {
        customer: 'Customer Name',
        orderDateandTime: new Date(),
        orderDetails: [
            {
                item: 'Name',
                itemId: 1,
                ingredientId: '',
                quantity: 1,
            }
        ],
        price: 0,
    },
    SINGLE_ORDER: 'orderID',

    // Item Management
    ADD_ITEM: {
        name: '',
        category: 1,
        dietary: 1,
        imgUrl: ''
    },
    UPDATE_ITEM_ID: 'itemID',
    UPDATE_ITEM: {
        name: '',
        image: '',
        availability: true,
        price: 100
    },

    // Ingredient Management
    ADD_INGEDIENT: {
        ingredients: [
            {
                ingredient: "Name",
                ingredientId: 1,
                quantity: 50
            }
        ],
        itemName: "item Name"
    },
    ITEM_INGREDIENT: 'ingredient ID',

    // Category Management
    ADD_CATEGORY: {
        id: 4,
        name: "SWEETS"
    },

    // Inventory Management
    UPDATE_INVENTORY: {
        availability: 0,
        price: 100
    },
    UPDATE_INVENTORY_ID: 'inventory id',
    ADD_INVENTORY: {
        id: 1, 
        name: '',
        availability: 100,
        price: 0
    },

    ALL_ITEMS: {
        filter: [],
        sort: {
            value: 'NAME',
            sort: 1
        }
    }
}

export default PAYLOAD_SAMPLE;
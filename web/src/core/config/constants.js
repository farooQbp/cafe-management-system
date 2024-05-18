import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PostAddIcon from '@mui/icons-material/PostAdd';
import BallotIcon from '@mui/icons-material/Ballot';
import CategoryIcon from '@mui/icons-material/Category';
import APP_LOGO from '../../assets/logo.png'

export const APPLICATION_NAME = 'CAFE MANAGEMENT'
export const APPLICATION_VERSION = 0.1;
export const LOGO = APP_LOGO;
export const APP_MENU = [
    {
        name: 'Home',
        value: 'home',
        subMenu: [],
        icon: <HomeIcon />,
        path: '/',
    },
    {
        name: 'User Management',
        value: 'user',
        subMenu: [],
        icon: <GroupIcon />,
        path: '/users',
    },
    {
        name: 'Order Management',
        value: 'order',
        subMenu: [],
        icon: <ShoppingCartIcon />,
        path: '/orders',
    },
    {
        name: 'Inventory Management',
        value: 'inventory',
        subMenu: [],
        icon: <PostAddIcon />,
        path: '/inventory',
    },
    {
        name: 'Item Management',
        value: 'item',
        subMenu: [],
        icon: <BallotIcon />,
        path: '/items',
    },
    {
        name: 'Category Management',
        value: 'category',
        subMenu: [],
        icon: <CategoryIcon />,
        path: '/category',
    },
]
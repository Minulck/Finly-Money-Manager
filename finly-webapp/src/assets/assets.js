import finly  from './FinlyLogo.png';
import finlyicon from './finlyicon.png';
import finlynobg from './finlyLogo-nobackground.png';
import background from './login-background.png';
import { LayoutDashboard, List, Wallet,Coins, FunnelPlus } from 'lucide-react';

export const assets = {
        finly,
        finlyicon,
        background,
        finlynobg
}

export const SIDE_BAR_DATA = [
        {
                id:"01",
                label:"Dashboard",
                icon : LayoutDashboard,
                path: "/dashboard"
        },
                {
                id:"02",
                label:"Category",
                icon : List,
                path: "/Category"
        },
                {
                id:"03",
                label:"Income",
                icon : Wallet,
                path: "/income"
        },
                {
                id:"04",
                label:"Expenses",
                icon : Coins,
                path: "/expense"
        },
                {
                id:"05",
                label:"Filters",
                icon : FunnelPlus,
                path: "/filter"
        },

]
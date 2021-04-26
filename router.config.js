import Home from './dormitory/shouye/Home';
import Pay from './dormitory/pay/Pay';
import Repair from './dormitory/repair/Repair';
import Forum from './dormitory/forum/Forum';
import Daka from './dormitory/daka/Daka';
import Activity from './dormitory/activity/Activity';
import Value from './dormitory/activity/Value';

import Lodging from './dormitory/pay/detail/Lodging';
import Air from './dormitory/pay/detail/Air';
import Meal from './dormitory/pay/detail/Meal';
import Water from './dormitory/pay/detail/Water';


const routes=[
    {
        path:'/',
        exact:true,
        component:Home
    },
    {
        path:'/pay',
        component:Pay,
        pri:true,
        routes:[
            {
                path:'/pay/lodging',
                component:Lodging,
            },
            {
                path:'/pay/air',
                component:Air,
            },
            {
                path:'/pay/meal',
                component:Meal,
            },
            {
                path:'/pay/water',
                component:Water,
            },
        ]
    },
    {
        path:'/repair',
        component:Repair,
        pri:true
    },
    {
        path:'/forum',
        component:Forum
    },
    {
        path:'/daka',
        component:Daka
    },
    {
        path:'/activity',
        component:Activity
    },
    {
        path:'/value',
        component:Value
    }
  
]
export default routes;
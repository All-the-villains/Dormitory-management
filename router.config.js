import Home from './dormitory/shouye/Home';
import Pay from './dormitory/pay/Pay';
import Repair from './dormitory/repair/Repair';
import Forum from './dormitory/forum/Forum';
import Daka from './dormitory/daka/Daka';


import Activity from './dormitory/activity/Activity';

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
    // {
    //     path:'/login',
    //     component:Login
    // },
    {
        path:'/activity',
        component:Activity
    },
  
    // {
    //     path:'/up',
    //     component:Up
    // }
]
export default routes;
import Home from './Home';//宿舍管理员信息-
import Doc from './Doc';//缴费
import Tuto from './Tuto';//维修
import Blog from './Blog';//打卡
import Comm from './Comm';//论坛
import Login from './Login';//登录
import Hooks from './Hooks';//水费
import Guide from './Guide';//饭费表
import Core from './Core';//总缴费表
import Api from './Api';//空调
import List from './List';//活动
import Comment from './Comment';
import Up from './Up';//查询
import Value from './Value'//活动内容
const routes=[
    {
        path:'/',
        exact:true,
        component:Home
    },
    {
        path:'/doc',
        component:Doc,
        pri:true,
        routes:[
            {
                path:'/doc/core',
                component:Core,
            },
            {
                path:'/doc/guide',
                component:Guide,
            },
            {
                path:'/doc/api',
                component:Api,
            },
            {
                path:'/doc/hooks',
                component:Hooks,
            }
        ]
    },
    {
        path:'/tuto',
        component:Tuto,
        pri:true
    },
    {
        path:'/blog',
        component:Blog
    },
    {
        path:'/comm',
        component:Comm
    },
    {
        path:'/login',
        component:Login
    },
    {
        path:'/list',
        component:List
    },
    {
        path:'/comment',
        component:Comment
    },
    {
        path:'/up',
        component:Up
    },
    {
        path:'/value',
        component:Value
    }
]
export default routes;
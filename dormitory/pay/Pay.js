import React from 'react'
import {NavLink, Switch, withRouter} from 'react-router-dom'
import './Pay.css';
import {RouteWithSubRoutes} from '../../App'; 
//二级路由里先将子路由拿过来，然后在子路由里再次调用一级路由
const Pay =({routes})=>{
    return(
        <span></span>
    )
}
export default withRouter(Pay);
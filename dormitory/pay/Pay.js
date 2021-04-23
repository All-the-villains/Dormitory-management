import React,{ Fragment } from 'react'
import {NavLink, Switch, withRouter} from 'react-router-dom'
import './Pay.css';
import {RouteWithSubRoutes} from '../../App';
//二级路由里先将子路由拿过来，然后在子路由里再次调用一级路由
import Navigation from './navigation/Navigation';
const Pay =({routes})=>{
    return(
        <Fragment>
            <div style={{float:'left',marginLeft:"100px"}}>
                <Navigation />
            </div>
            <div style={{float:'left',marginLeft:'100px'}}>
                <Switch>
                    {routes.map((route)=><RouteWithSubRoutes {...route}/>)}
                </Switch>
            </div>
        </Fragment>
    )
}
export default withRouter(Pay);
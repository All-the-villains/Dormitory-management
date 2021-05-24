import React from 'react'
import {NavLink, Switch, withRouter} from 'react-router-dom'
import './Doc.css';
import {RouteWithSubRoutes} from './App'; 
//二级路由里先将子路由拿过来，然后在子路由里再次调用一级路由
const Doc =({routes})=>{
    return(
        <header className='h'>
        <nav className='n'>
          <NavLink to='/doc/core'>总缴费表</NavLink>
          <NavLink to='/doc/guide'>饭卡充值</NavLink>
          <NavLink to='/doc/api'>空调费充值</NavLink>
          <NavLink to='/doc/hooks'>水卡充值</NavLink>
        </nav>
        <Switch>
          {routes.map((route)=><RouteWithSubRoutes {...route}/>)} 
        </Switch>
        </header>
    )
}
export default withRouter(Doc);
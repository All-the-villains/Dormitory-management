import React, { Component } from 'react'
import {NavLink, Switch, withRouter} from 'react-router-dom'
import './Navigation.css';
import Login  from '../../login/Login'

class Navigation extends Component {
     
    render(){
        return (
            <div>
                <ul className='navigation'>
                    <li><h3>详细信息</h3></li>
                    <li><NavLink activeClassName='expenses' to='/pay/lodging'>住宿费</NavLink></li>
                    <li><NavLink activeClassName='expenses' to='/pay/air'>空调费</NavLink></li>
                    <li><NavLink activeClassName='expenses' to='/pay/meal'>饭卡充值</NavLink></li>
                    <li><NavLink activeClassName='expenses' to='/pay/water'>水卡充值</NavLink></li>
                </ul>
                
            </div>
        )
    }
}
export default withRouter(Navigation) ;
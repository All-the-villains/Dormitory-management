import React from 'react'
import {NavLink, Switch, withRouter} from 'react-router-dom'
import './Navigation.css';
const Navigation = () => {
    return (
        <div>
            <ul className='navigation'>
                <li><h3>详细信息</h3></li>
                <li><NavLink activeClassName='expenses' to='/repair/appliances'>电器维修</NavLink></li>
                <li><NavLink activeClassName='expenses' to='/repair/windows'>门窗维修</NavLink></li>
                <li><NavLink activeClassName='expenses' to='/repair/furniture'>桌椅维修</NavLink></li>
            </ul>
        </div>
    )
}
export default Navigation;
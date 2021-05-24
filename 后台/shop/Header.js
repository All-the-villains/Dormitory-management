import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'
const Header = () => {
    return (
        <header>
            <nav>
                <NavLink activeClassName='active' to='/up'>查询</NavLink>
                <NavLink activeClassName='active' exact to='/'>宿舍管理员</NavLink>
                <NavLink activeClassName='active' to='/doc/core'>缴费</NavLink>
                <NavLink activeClassName='active' to='/tuto'>维修</NavLink>
                <NavLink activeClassName='active' to='/blog'>打卡</NavLink>
                <NavLink activeClassName='active' to='/comm'>论坛</NavLink>
                <NavLink activeClassName='active' to='/list'>活动</NavLink>
            </nav>
        </header>
    ) 
}
export default Header
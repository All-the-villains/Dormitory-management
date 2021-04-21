import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'
const Header = (props) => {
    return (
       <div>
           
           <header>
            
            <nav>               
                <NavLink activeClassName='active' exact to='/' style={{marginLeft:0}}>首页</NavLink>
                <NavLink activeClassName='active' to='/pay'>缴费</NavLink>
                <NavLink activeClassName='active' to='/repair'>维修</NavLink>
                <NavLink activeClassName='active' to='/forum'>论坛</NavLink>
                <NavLink activeClassName='active' to='/daka'>打卡</NavLink>
                <NavLink activeClassName='active' to='/activity'>活动</NavLink>
                <NavLink activeClassName='active' to='/my'>我的</NavLink>
            </nav>
        </header>
       </div>
        
    ) 
}
export default Header
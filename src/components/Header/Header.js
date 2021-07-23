import React, { useState } from 'react'
import "./Header.scss"
import HeaderOption from './HeaderOption';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../features/userSlice';
import avatar from "../../images/me.jpg"
import { Link } from 'react-router-dom'

//Icons
import { ArrowDropDown, BusinessCenter, Chat, Home, Notifications, Search, SupervisorAccount } from '@material-ui/icons';
import { auth } from '../../firebase';
import { Menu, MenuItem, Button } from '@material-ui/core';

const Header = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
    const handleClose = () => {
        setAnchorEl(null);
      };

    const user = useSelector(selectUser)

    const dispatch = useDispatch()

    const logoutFromApp = () => {
        dispatch(logout())
        auth.signOut()
        handleClose()
    }

    return (
        <div className="header"> 
            <div className="headerLeft">
                <a href=""> <img src="https://image.flaticon.com/icons/png/512/174/174857.png  " alt="" /> </a>

                <div className="headerSearch">
                    <Search/>
                    <input placeholder="Search" type="text" />
                </div>
            </div>

            <div className="headerRight">
                <a style={{textDecoration: "none"}} href=""> 
                <HeaderOption Icon={Home} Title="Home" />   </a> 
                <HeaderOption Icon={SupervisorAccount} Title="My Account" />
                <HeaderOption Icon={BusinessCenter} Title="Jobs" />
                <HeaderOption Icon={Chat} Title="Messaging" />
                <HeaderOption Icon={Notifications} Title="Notifications" />
                {user ? <HeaderOption user={user}  Title="Me" Logout={handleClick} />: null}
                
                <div className="menu">
                <Menu
                keepMounted
                anchorEl={anchorEl} 
                open={Boolean(anchorEl)} 
                onClose={handleClose}
                >
                    <MenuItem onClick={logoutFromApp} ><Link to="/"> Log Out</Link></MenuItem>
                </Menu>
            </div>
            </div>
            
        </div>
    )
}

export default Header

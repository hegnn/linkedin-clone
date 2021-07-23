import React from 'react'
import "./HeaderOption.scss"
import {Avatar} from "@material-ui/core"
import { ArrowDropDown, FiberManualRecord } from '@material-ui/icons'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'

const HeaderOption = ({Icon, Title, user, Logout}) => {

    return (
        <div onClick={Logout } className="headerOption">
            {Icon && <Icon className="headerOptionIcon" />}
            {user && <Avatar className="headerOptionIcon" src={user.photoURL}> {user.displayName ? user.displayName[0] : null } </Avatar> }
            <div className="title">
                <h3 className="headerOptionTitle"> {Title} </h3>
                {user && <ArrowDropDown />} 
            </div>
        </div>
        
    )
}

export default HeaderOption

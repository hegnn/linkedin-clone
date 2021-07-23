import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import { db } from '../../firebase'
import "./LeftSidebar.scss"

const LeftSidebar = () => {
    const user = useSelector(selectUser)
    const [yourPosts, setYourPosts] = useState()
    const [posts, setPosts] = useState()

    useEffect(() => {
        db.collection("userDetails").doc(user.uid).onSnapshot((snapshot) => {
            setYourPosts(snapshot.data().posts)
        })

        db.collection('posts').onSnapshot(snapshot => {
            setPosts(snapshot.size) 
         });

    }, [])

    const recentItem = (topic) => (
        <div className="sidebarRecentItem">
            <span className="sidebarHash">#</span>
            <p>{topic}</p>
        </div>
    )

    return (
        <div className="leftSidebar">
            <div className="sidebarTop">
                <img src="https://images.unsplash.com/photo-1625517938698-71e9c41434d1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80" alt="" className="backgroundImage" />
                <Avatar src={user.photoURL} className="sidebarAvatar"> {user.displayName ? user.displayName[0] : null} </Avatar>
                <h2>{user.displayName}</h2>
                <h4>{user.email}</h4>
            </div>

            <div className="sidebarStats">
                <div className="sidebarStat">
                    <p>Your posts</p>
                    <p className="sidebarStatNumber">{yourPosts}</p>
                </div>

                <div className="sidebarStat">
                    <p>Total posts</p>
                    <p className="sidebarStatNumber">{posts}</p>
                </div>
            </div>

            <div className="sidebarBottom">
                <p>Recent</p>
                {recentItem("reactjs")}
                {recentItem("redux")}
                {recentItem("frontend")}
            </div>
        </div>
    )
}

export default LeftSidebar

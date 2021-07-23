import { Avatar } from '@material-ui/core'
import { CommentOutlined, Send, Share, ThumbUpOutlined } from '@material-ui/icons'
import React, {forwardRef} from 'react'
import InputOption from './InputOption'
import "./Post.scss"

const Post = forwardRef(({name, description, message, photoUrl}, ref) => {
    return (
        <div ref={ref} className="post" >
            <div className="postHeader">
                <Avatar src={photoUrl} className="avatar"> {name[0]} </Avatar> 
                <div className="postInfo">
                    <h2>{name} </h2>
                    <p>{description} </p>
                </div>
            </div>

            <div className="postBody">
                <p>{message}</p>
            </div>

            <div className="postButtons">
                <InputOption Icon={ThumbUpOutlined} Title="Like"/>
                <InputOption Icon={CommentOutlined} Title="Comment"/>
                <InputOption Icon={Share} Title="Share"/>
                <InputOption Icon={Send} Title="Send"/>
            </div>
        </div>
    )
})

export default Post

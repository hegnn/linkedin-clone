import { CalendarViewDay, Create, EventNote, Image, YouTube } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import firebase from "firebase"
import "./Feed.scss"
import InputOption from './InputOption'
import Post from './Post'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import FlipMove from 'react-flip-move'

const Feed = () => {
    const user = useSelector(selectUser)
    const [input, setInput] = useState("")
    const [posts, setPosts] = useState([])

    useEffect(() => {
        db.collection("posts").orderBy("timestamp", "desc").onSnapshot((snapshot) => 
        setPosts(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data()
            }))
        ))
    }, [])
    
    const sendPost = (e)=> {
        e.preventDefault()

        db.collection('posts').add({
            name: user.displayName,
            description: user.email,
            message: input,
            photoUrl: user.photoURL,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        setInput("")
        
        const data = db.collection("userDetails").doc(user.uid)
        data.get().then((doc) => data.update({posts : doc.data().posts + 1}))
    }

    return (
        <div className="feed">
            <div className="feedInputContainer">
                <div className="feedInput">
                    <Create/>
                    <form>
                        <input value={input} onChange={e => setInput(e.target.value)} type="text" />
                        <button onClick={sendPost} type="submit">Send</button>
                    </form>
                </div>

                <div className="feedInputOption">
                    <InputOption Icon={Image} Title="Photo" Color="#70B5F9" />
                    <InputOption Icon={YouTube} Title="Video" Color="#E7A33E" />
                    <InputOption Icon={EventNote} Title="Event" Color="#C0CBCD" />
                    <InputOption Icon={CalendarViewDay} Title="Write article" Color="#7FC15E" />
                </div>
            </div>

            <FlipMove>

                <Post
                    key="5HMNN60Tgsj3x8t3DoQ2"
                    name="Harun Ergin Gönen"
                    description="hegonen98@gmail.com"
                    message="If you write in the section above and press enter, your post will be on my LinkedIn forever ! The other buttons are not working for now. Click to 'Me' button to logout."
                    photoUrl={"https://media-exp1.licdn.com/dms/image/C5603AQECezLAoT4DKA/profile-displayphoto-shrink_800_800/0/1624377220692?e=1632355200&v=beta&t=TBTxwAU1mebtBeG2dyN_etMcQ2Qls2J3D3WywJpc2pQ"}
                />

                {posts.map(({ id, data: {name, description, message, photoUrl}}) => (
                    <Post
                        key={id}
                        name={name}
                        description={description}
                        message={message}
                        photoUrl={photoUrl}
                    />
                ))} 

            </FlipMove>


        </div>
    )
}

export default Feed

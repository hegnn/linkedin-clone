import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, login } from '../../features/userSlice'
import { auth, db } from '../../firebase'
import firebase from "firebase"

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [profilePic, setProfilePic] = useState("")
    const dispatch = useDispatch()
    const user = useSelector(selectUser)

    const Register = () =>{
        if(!name) alert("Please enter a full name!")

        else(
            auth.createUserWithEmailAndPassword(email, password) //firebase
            .then((userAuth) => { 
                userAuth.user.updateProfile({
                    displayName: name,
                    photoURL: profilePic,
                })
                .then(() => {
                    db.collection('userDetails').doc(userAuth.user.uid).set({
                        posts: 0
                    })
                })
                .then(() => { //redux 
                    dispatch(login({
                         email: userAuth.user.email,
                         uid: userAuth.user.uid,
                         displayName: name,
                         photoURL: profilePic,
                         posts: userAuth.user.posts
                    }))
                })
            }).catch(error => alert(error))
        )
    }

    return (
        <div className="login">
            
            <form action="">
                <input value={name}  onChange={e => setName(e.target.value)} placeholder="Full name *" type="text" />
                <input value={profilePic}  onChange={e => setProfilePic(e.target.value)} placeholder="Profile pic URL (Optional)" type="text" />
                <input value={email}  onChange={e => setEmail(e.target.value)} placeholder="Email *" type="email" />
                <input value={password}  onChange={e => setPassword(e.target.value)} placeholder="Password *" type="password" />
                
                <button type="button" onClick={Register}>Sign Up</button>
            </form>

            <p>Already on LinkedIn?{" "}
                <a href="/login" className="loginRegister" >Sign in</a>
            </p>
        </div>
    )
}

export default Register

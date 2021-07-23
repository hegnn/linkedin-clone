import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, selectUser } from '../../features/userSlice'
import { auth } from '../../firebase'
import { Link, Redirect } from 'react-router-dom'
import "./Login.scss"

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const user = useSelector(selectUser)

    const loginToApp = (e)=>{
        e.preventDefault()
        auth.signInWithEmailAndPassword(email, password)
        .then((userAuth) => {
            dispatch(
                login({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: userAuth.user.displayName,
                    photoURL: userAuth.user.photoURL
                })
            )
        })
        .catch(error => alert(error))
    }

    return (
        <div className="login">
            
            <form action="">
                <input value={email}  onChange={e => setEmail(e.target.value)} placeholder="Email *" type="email" />
                <input value={password}  onChange={e => setPassword(e.target.value)} placeholder="Password *" type="password" />
                
                <button type="submit" onClick={loginToApp}>Sign In</button>
            </form>

            <p>New to LinkedIn?{" "}
                <a href="/register" className="loginRegister" >Sign Up Now</a>
            </p>
        </div>
    )
}

export default Login

import React, { useEffect } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import LeftSidebar from './components/LeftSlidebar/LeftSidebar';
import RightSidebar from './components/RightSlidebar/RightSidebar';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Feed from './components/Feed/Feed';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './firebase';

import { BrowserRouter , Route, Redirect } from 'react-router-dom'

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if(userAuth){ //user is logged in
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoURL: userAuth.photoURL
          })
        )
      }
      else{//user is logged out
        dispatch(logout())
      } 

    })
  }, [])

  return (
    <BrowserRouter>
      <div className="app">
        <Header/>
            <Route exact path="/">
               <Redirect to="/login" />
            </Route> 

            <Route path="/login">
              {user ? <Redirect to="/feed" /> : <Login/>}
            </Route>

            <Route path="/register">
              {user ? <Redirect to="/feed" /> : <Register/>}
            </Route>

            <Route path="/feed">
              {!user ? <Redirect to="/" /> : 
                <div className="body">
                  <LeftSidebar/>
                  <Feed/>
                  <RightSidebar/>
                </div>
              }
            </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;

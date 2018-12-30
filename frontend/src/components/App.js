import React, {useEffect} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import LoginForm from './login'
import Signup from './Signup'
import OurTool from './OurTool'
import Header from './Header';
import Home from './Home'
import Footer from './Footer'
import ProfilePage from './ProfilePage'
import CommunityPage from './CommunityPage'
import { searchForUser } from '../store/'
import { logout } from '../store/actions/login'

import '../styles/css/app.css'


const App = ({loggedIn, user, logout}) => {

    useEffect(()=>{
      if(localStorage.token === undefined){

      }else{

      searchForUser(localStorage.token)
    }
  },[])


    return (

      <div className='App'>
      <Header logout={logout} loggedIn={loggedIn} />

      <Switch>
        <Route path="/" exact component={Home}
        />
        <Route path="/signup" render={props=>(
          !loggedIn ? <Signup {...props} /> 
          : <Redirect to="/home" exact />)} 
        />
        <Route path="/home" render={props=>(
          loggedIn ? (<OurTool {...props} />) 
          : (<Redirect  to="/login" exact />) )} 
        />
        <Route path="/profile" render ={props=>(
          loggedIn ? (<ProfilePage {...props} user={user}/>)
          : (<Redirect to="/login" exact />)
        )} />
        <Route path="/community" render ={props=>(
          loggedIn ? (<CommunityPage {...props} user={user}/>)
          : (<Redirect to="/login" exact />)
        )} />
      </Switch>
      
      <Footer />
      </div>

    )

}

const mapStatetoProps = ({login:{loggedIn, user}}) => {
  return {
    loggedIn,
    user,

  }
}

const mapFuncToProps = dispatch => {
  return {
    searchForUser: (token) => dispatch(searchForUser(token)),
    logout: () => dispatch(logout())
  }
}

export default connect(mapStatetoProps, mapFuncToProps,  null, {pure:false})(App);

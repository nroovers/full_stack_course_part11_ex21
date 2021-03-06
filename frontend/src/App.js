import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'

// import blogsService from './services/blogs'
// import loginService from './services/login'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import BlogView from './components/BlogView'
import UserList from './components/UserList'
import UserView from './components/UserView'
// import BlogForm from './components/BlogForm'
// import Toggable from './components/Toggable'
import Login from './components/Login'
import Menu from './components/Menu'

import { initializeBlogs, createBlog, updateBlog, likeBlog, removeBlog } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { setLogin, resetLogin } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'

const App = (props) => {

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      console.log('load user', loggedUserJSON)
      const user = JSON.parse(loggedUserJSON)
      props.setLogin(user)
    }
  }, [])

  useEffect(() => {
    console.log('get all blogs')
    props.initializeBlogs()
    props.initializeUsers()
  }, [])

  console.log('check user', props.login)

  return (
    <div>
      <Router>
        <Menu></Menu>
        <Notification />
        Some change for ex 11.22
        <Route exact path="/" render={() => props.login ? <Blogs /> : <Redirect to="/login" />} />
        <Route exact path="/login" render={() => props.login ? <Redirect to="/" /> : <Login></Login>} />
        <Route exact path="/blogs/:id" render={({ match }) => <BlogView blogid={match.params.id} />} />
        <Route exact path="/users" render={() => props.login ? <UserList /> : <Redirect to="/login" />} />
        <Route exact path="/users/:id" render={({ match }) => <UserView userid={match.params.id} />} />
      </Router>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log('APP - mapStateToProps', state)
  return {
    blogs: state.blogs,
    login: state.login,
    // users: state.users,
    notification: state.notification
  }
}

const mapDispatchToProps = {
  initializeBlogs, createBlog, updateBlog, likeBlog, removeBlog,
  initializeUsers,
  setLogin, resetLogin,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

import Bookmark from './pages/bookmark/Bookmark';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Settings from './pages/settings/Settings';
import Chat from './pages/chat/Chat';
import Password from './pages/password/Password';
import Update from './pages/update/Update';
import Comment from './pages/comment/Comment';
import { BrowserRouter as Router, Route, Routes , Navigate } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Friends from './pages/friends/Friends'

function App() {

    const {user} = useContext(AuthContext)
    
  return (
  <Router>
      <Routes>
        <Route exact path="/" element={user ? <Home/> : <Login/> }/>
        <Route  exact path="/login" element={user ? <Navigate replace to = '/' /> : <Login/>}/>
        <Route exact path="/signup" element = {<Signup/>}/>
        <Route  path="/profile/:username" element={<Profile/>}/>
        <Route exact path="/settings" element={<Settings/>}/>
        <Route exact path="/bookmark" element={<Bookmark/>}/>
        <Route exact path="/chat" element={<Chat/>}/>
        <Route exact path="/password" element={<Password/>}/>
        <Route exact path="/update" element={<Update/>}/>
        <Route exact path="/comment" element={<Comment/>}/>
        <Route exact path="/friends" element={<Friends/>}/>
      </Routes>
  </Router>
  );
}

export default App;

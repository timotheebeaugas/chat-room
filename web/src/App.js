import React, {useState} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import { AnimatePresence } from "framer-motion";
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000') /* tester automatiqument le port en local et en prod */

function App() {

  const [username, setUsername] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [avatar, setAvatar] = useState("")

  const login = () => {
    if(username){
      setIsLogged(!isLogged);
      socket.emit("log in", username) 
      setAvatar('#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6))
    }
  } 

  const logout = () => {
    setUsername("");
    setIsLogged(!isLogged);
    socket.emit("log out", username)
  }

  return (
    <AnimatePresence>
    <BrowserRouter>
      <Switch>
        {isLogged && 
          <Route exact path="/" render={() => <Home username={username} avatar={avatar} socket={socket} logout={logout} />} />
        }
        {!isLogged && 
          <Route exact path="/" render={() => <Login username={username} login={login} setUsername={setUsername}/>} />
        }
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
    </AnimatePresence>
  );
}

export default App;

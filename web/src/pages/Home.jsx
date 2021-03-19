import React, {useState} from 'react';
import Chat from '../components/Chat';
import io from 'socket.io-client';
import Navigation from '../components/Navigation';

const socket = io.connect('http://localhost:4000') /* tester automatiqument le port en local et en prod */

const Home = (props) => {

  const [username, setUsername] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [avatar, setAvatar] = useState()

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
    <div>

      {isLogged && 
        <div>
          <Navigation data={logout} />
          <Chat username={username} avatar={avatar} socket={socket} />
        </div>
      }

      {!isLogged && 
        <div>
          <h1>login</h1>
          <input 
            type="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={() => login()}>Login</button> 
        </div>
      }

    </div>
  );
};

export default Home;
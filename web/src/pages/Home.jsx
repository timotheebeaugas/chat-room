import React, {useState} from 'react';
import Chat from '../components/Chat';
import io from 'socket.io-client';
import Welcome from '../components/Welcome';

const socket = io.connect('http://localhost:4000') /* tester automatiqument le port en local et en prod */

const Home = (props) => {

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
    <div>
      <div id="wave-height"></div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fillOpacity="1" d="M0,32L48,74.7C96,117,192,203,288,234.7C384,267,480,245,576,224C672,203,768,181,864,160C960,139,1056,117,1152,128C1248,139,1344,181,1392,202.7L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
      {isLogged && 
        <div className="main-content">
          <Chat username={username} avatar={avatar} socket={socket} data={logout} />
        </div>
      }

      {!isLogged && 
        <div className="main-content">
          <Welcome username={username} data={login} setUsername={(e) => setUsername(e.target.value)}/> 
        </div>
      }

    </div>
  );
};

export default Home;
import React, { useEffect, useState, useRef } from 'react';
import Information from '../components/Information';
import Message from '../components/Message';
import Avatar from '../components/Avatar';
import { FiSend } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import { motion } from "framer-motion";
import io from 'socket.io-client';

const Home = (props) => {

  const { username, avatar, socket, logout } = props

  function currentTime() {
    var date = new Date();
    var localeSpecificTime = date.toLocaleTimeString();
    return localeSpecificTime.replace(/:\d+ /, ' ');
  }

  const [state, setState] = useState({ message: '', name: username, avatar: avatar, date: "" });
  const [chat, setChat] = useState([]);
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    const socket = io.connect('http://localhost:4000')

    socket.on('message', ({ name, avatar, message, date }) => {
      setChat([...chat, { name, avatar, message, date }])
      socket.disconnect();
    })
    socket.on('log in', (user) => {
      setChat([...chat, user + ' is connected'])
      socket.disconnect();
    });
    socket.on('log out', (user) => {
      setChat([...chat, user + ' is disconnected'])
      socket.disconnect();
    }); 
    scrollToBottom();
    
  }, [chat, socket]);

  const onTextChange = (e) => {
    setState({ ...state, message: e.target.value })
  };

  const onMessageSubmit = (e) => {
    if (state.message.length > 0) {
      e.preventDefault()
      const { name, message, avatar } = state
      socket.emit("message", { name, avatar, message, date: currentTime() })
      setState({ message: "", name, avatar, date: "" })      
    }
  };

  const variants = {
    initial: {
      opacity: 0,
      x: -100,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: 100,
    }
  }

  return (
    <main>
      <div id="wave-height"></div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fillOpacity="1" d="M0,32L48,74.7C96,117,192,203,288,234.7C384,267,480,245,576,224C672,203,768,181,864,160C960,139,1056,117,1152,128C1248,139,1344,181,1392,202.7L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
      <div className="main-content">
        <motion.div
          id="chat-window"
          initial="initial"
          animate="visible"
          transition={{ duration: 0.5 }}
          exit="exit"
          variants={variants}
        >
          <div className="one-line">
            <header id="chat-header">
              <div className="one-line">
                <Avatar state={state} />
                <p className="username">{username}</p>
              </div>
              <div className="icon" onClick={logout}><FiLogOut size={28} /></div> {/* ce composant ne sert à rien !!!! */}
            </header>
          </div>
          <div>
            <div id="chat-box">
              <ul>
                {
                  chat.map((chat, index) => (
                    chat.message ?
                      <div key={index} ref={messagesEndRef}>
                        <Message chat={chat} state={state} />
                      </div>
                      :
                      <div key={index} ref={messagesEndRef}>
                        <Information chat={chat} />
                      </div>
                  ))
                }
              </ul>
            </div>
          </div>
          <footer>
            <form>
              <div className="one-line" id="chat-footer">
                <textarea
                  name="message"
                  onChange={e => onTextChange(e)}
                  value={state.message}
                  label="Message"
                  id="input-message"
                  type="text"
                  placeholder="Type your message here"
                  maxLength="300"
                  minLength="1"
                ></textarea>
                <div className="icon" onClick={onMessageSubmit}><FiSend size={28} /></div>
              </div>
            </form>
          </footer>
        </motion.div>
      </div>
    </main>
  );
};

export default Home;
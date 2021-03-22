import React, {useEffect, useState, useRef } from 'react';
import Information from './Information';
import Message from './Message';
import Avatar from './Avatar';
import { FiSend } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import {motion} from "framer-motion";

const Home = (props) => {

  function currentTime(){
    var date = new Date();
    var localeSpecificTime = date.toLocaleTimeString();
    return localeSpecificTime.replace(/:\d+ /, ' ');
  }

  const { username, avatar, socket, data } = props
  const [state, setState] = useState({message: '', name: username, avatar: avatar, date: ""});
  const [chat, setChat] = useState([]);
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => { 
    socket.on('message', ({name, avatar, message, date}) => {
      setChat([...chat, {name, avatar, message, date}])
    })
    socket.on('log in', (user) => {
      setChat([...chat, user + ' is connected'])
    });
    socket.on('log out', (user) => {
      setChat([...chat, user + ' is disconnected'])
    });
    socket.on("leave", () => {
      setChat([...chat, 'An user has left the chat room'])
    });
    scrollToBottom();
  }, [chat, socket]);

  const onTextChange = (e) => {
    setState({...state, message: e.target.value})
  };

    const onMessageSubmit = (e) => {
      if(state.message.length > 0){
        e.preventDefault()
        const { name, message, avatar } = state
        socket.emit("message", { name, avatar, message, date:currentTime() })
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
        <motion.div  
        id="chat-window"
        initial="initial"
        animate="visible"
        transition={{ duration: 0.5 }}
        exit="exit"
        variants={variants}
        >
          <div className="one-line">
            <div id="chat-top">
              <div className="one-line">
                  <Avatar data={state} />
                  <p className="username">{username}</p>
              </div>
              <div className="icon" onClick={data}><FiLogOut size={28} /></div> {/* ce composant ne sert à rien !!!! */}
            </div>
          </div>
            <div>
                <div id="chat-box">
                  {
                    chat.map((chat, index) => (
                      chat.message ? 
                      <div>
                        <Message chat={chat} data={state} key={index} />
                        <div ref={messagesEndRef} />
                      </div>
                      :
                      <div>
                        <Information chat={chat} key={index} />
                        <div ref={messagesEndRef} />
                      </div>
                    ))
                  }
                </div>
            </div>
            <form>
                <div className="one-line" id="chat-bottom">
                    <textarea
                        name="message"
                        onChange={e => onTextChange(e)}
                        value={state.message}
                        label="Message"
                        id="input-message"
                        type="text" 
                        placeholder="Type your message here"
                        maxlength="300"
                        minlength="1"
                    ></textarea>
                  <div className="icon" onClick={onMessageSubmit}><FiSend size={28}/></div> 
                </div>
            </form>
        </motion.div>
    );
};

export default Home;
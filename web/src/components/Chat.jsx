import React, {useEffect, useState} from 'react';
import Avatar from './Avatar';
import Information from './Information';
import Message from './Message';

const Home = (props) => {

  function currentTime(){
    var date = new Date();
    var localeSpecificTime = date.toLocaleTimeString();
    return localeSpecificTime.replace(/:\d+ /, ' ');
  }

  const { username, avatar, socket } = props
  const [state, setState] = useState({message: '', name: username, avatar: avatar, date: ""});
  const [chat, setChat] = useState([]);

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
  }, [chat, socket]);

  const onTextChange = (e) => {
    setState({...state, message: e.target.value})
  };

    const onMessageSubmit = (e) => {
        e.preventDefault()
        const { name, message, avatar } = state
        socket.emit("message", { name, avatar, message, date:currentTime() })
        setState({ message: "", name, avatar, date: "" })
    }

    return (
        <div>
           <Avatar data={state} />
            <p>{username}</p>
            <form onSubmit={onMessageSubmit}>
                <h1>Messanger</h1>
                <div>
                    <textarea
                        name="message"
                        onChange={e => onTextChange(e)}
                        value={state.message}
                        label="Message"
                    ></textarea>
                </div>
                <button>Send</button>
            </form>
            <div>
                <h1>Chat log</h1>
                {
                  chat.map((chat, index) => (
                    chat.message ? 
                    <Message chat={chat} key={index} />
                    :
                    <Information chat={chat} key={index} />
                  ))
                }
            </div>
        </div>
    );
};

export default Home;
import React from 'react';
import {motion} from "framer-motion";

const Welcome = (props) => {
    const {data, username, setUsername} = props;

    const variants = {
        initial: {
          opacity: 0,
          x: 100,
        },
        visible: {
          opacity: 1,
          x: 0,
        },
        exit: {
          opacity: 0,
          x: -100,
        }
      }

    return (
        <motion.div 
        id="wave"
        initial="initial"
        animate="visible"
        transition={{ duration: 0.5 }}
        exit="exit"
        variants={variants}
        >
            <h1>Chat room</h1>
            <h2>Simple chat app. Choose an username and come in. Open multiple tabs to simulate a group chat.</h2>
            <div className="one-line">
                <input 
                id="input-login"
                value={username}  
                onChange={setUsername}
                type="text" 
                placeholder="Username"
                maxLength="20" 
                minLength="1"
                required
            />
                <div id="button-login" onClick={data}>Login</div>
            </div>
        </motion.div>
    );
};

export default Welcome; 
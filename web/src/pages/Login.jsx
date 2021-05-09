import React from 'react';
import { motion } from "framer-motion";

const Login = (props) => {
    const { login, username, setUsername } = props;

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
        <main>
            <div id="wave-height"></div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fillOpacity="1" d="M0,32L48,74.7C96,117,192,203,288,234.7C384,267,480,245,576,224C672,203,768,181,864,160C960,139,1056,117,1152,128C1248,139,1344,181,1392,202.7L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
            <div className="main-content">
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
                    <div id="login-button-alignment">
                        <input
                            id="input-login"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            placeholder="Username"
                            maxLength="20"
                            minLength="1"
                            required
                        />
                        <div id="button-login" onClick={login}>Login</div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
};

export default Login;
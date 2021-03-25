import React from 'react';
import Avatar from './Avatar';

const Message = (props) => {
    const { chat, state } = props;

    return (
        <li className="message" >
            <p className="date">{chat.date}</p>
            <div className={chat.name !== state.name && "align-avatar"}>
                {chat.name !== state.name &&
                    <div className="message-avatar">
                        <Avatar state={chat} />
                    </div>
                }
                <div>
                    {chat.name !== state.name &&
                        <div className="username">{chat.name}</div>
                    }
                    <div
                        className={chat.name === state.name ? "isAuthor" : "isNotAuthor"}
                    >
                        {chat.message}
                    </div>
                </div>
            </div>
        </li>
    );
};

export default Message;
import React from 'react';
import Avatar from './Avatar';

const Message = (props) => {
    const { chat } = props;

    return (
        <div id="message">
        {   
            <div>
                <Avatar data={chat} /> {chat.name}<span>{chat.message}</span> {chat.date}
            </div>
        } 
        </div>
    );
};

export default Message;
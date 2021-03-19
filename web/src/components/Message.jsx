import React from 'react';
import Avatar from './Avatar';

const Message = (props) => {
    const { chat, data } = props;

    return (
        <section className="message">
            {
                <div className="alignment">
                    {chat.name !== data.name &&
                        <p>
                            <Avatar data={chat} /> <span>{chat.name}</span>
                        </p>
                    }
                    <p className="date">{chat.date}</p>
                    <p
                        className={chat.name === data.name ? "isAuthor" : "isNotAuthor"}
                    >
                        {chat.message} 
                    </p>
                    
                </div>
            }
        </section>
    );
};

export default Message;
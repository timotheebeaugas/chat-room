import React from 'react';
import Avatar from './Avatar';

const Message = (props) => {
    const {chat, data} = props;

    return (
        <section className="message">
                <p className="date">{chat.date}</p>
                <div className={chat.name !== data.name && "align-avatar"}>                    
                    {chat.name !== data.name &&
                        <div>
                            <Avatar data={chat} />
                        </div>
                        
                    }
                    <div>
                        {chat.name !== data.name &&
                            <div className="username">{chat.name}</div>
                        }
                        <div
                            className={chat.name === data.name ? "isAuthor" : "isNotAuthor"}
                        >
                            {chat.message} 
                        </div>
                    </div>
                </div>
            
        </section>
    );
};

export default Message;
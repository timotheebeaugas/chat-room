import React from 'react';

const Information = (props) => {
    const { chat } = props;

    return (
        
        <div>
            <p>{chat}</p>
        </div>
    );
};

export default Information;
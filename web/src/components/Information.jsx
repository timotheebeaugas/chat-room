import React from 'react';

const Information = (props) => {
    const { chat } = props;

    return (
        
        <div className="information">
            <p>{chat}</p>
        </div>
    );
};

export default Information;
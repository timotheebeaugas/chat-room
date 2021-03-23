import React from 'react';

const Information = (props) => {
    const {chat} = props;

    return (
        <li className="information">
            <p>{chat}</p>
        </li>
    );
};

export default Information;
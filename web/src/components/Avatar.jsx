import React from 'react';

const Avatar = (props) => {
    const {state} = props;
    return (
        <figure className="avatar" style={{backgroundColor: state.avatar}}>
            <span>{state.name.charAt(0)}</span>
        </figure>
    );
};

export default Avatar;
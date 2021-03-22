import React from 'react';

const Avatar = (props) => {
    const {data} = props;
    return (
        <div className="avatar" style={{backgroundColor: data.avatar}}>
            <span>{data.name.charAt(0)}</span>
        </div>
    );
};

export default Avatar;
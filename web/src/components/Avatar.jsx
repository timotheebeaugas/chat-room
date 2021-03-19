import React from 'react';

const Avatar = (props) => {
    const { data } = props;
    return (
        <div>
            <span style={{backgroundColor: data.avatar}}>{data.name.charAt(0)}</span>
        </div>
    );
};

export default Avatar;
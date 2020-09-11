import React from 'react';

import './Message.css';


const Message = ({message: {user, text}, name, imageURL, textColor}) => {
    const textColorStyle = {color: textColor};
    
    let usersColourClassStyle = 'container';
    const trimmedName = name.trim().toLowerCase();

    if(user === trimmedName){
        // isSentByCurrentUser = true;
        usersColourClassStyle += ' darker';
    }

    return (
        <div className={usersColourClassStyle} key={user}>
            <img src={imageURL} />
            <p>{text}</p>
            <span className="time-right" style={textColorStyle}>{user}</span>
        </div>
    );
}
export default Message;
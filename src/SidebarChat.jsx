import "./SidebarChat.css";
import React, { useEffect, useState } from 'react';
import { Avatar, IconButton } from "@material-ui/core";
import db from './Firebase';
import { Link } from "react-router-dom";


function SidebarChat({ id,name,addNewChat}){

    const [seed, setSeed] = useState('');
    useEffect(()=>{
        var x=Math.floor(Math.random() * 5000);
        setSeed(x);
    }, [])

    const createChat = () => {
        var roomName= prompt("Type room name");
        if(roomName){
            //databse
            if (roomName) {
                db.collection('rooms').add({
                    name: roomName,
                });
            }
        }
    }

    console.log(name);
    return !addNewChat? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="sidebarChat_info">
                    <h2>{name}</h2>
                    <p>message</p>
                </div>
            </div>
        </Link>
    ):(
        <div onClick={createChat} className="sidebarChat">
                <h2>Add new Chat</h2>
        </div>
    );

}

export default SidebarChat;
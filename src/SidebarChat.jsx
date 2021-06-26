import "./SidebarChat.css";
import React, { useEffect, useState } from 'react';
import { Avatar, IconButton } from "@material-ui/core";
import db from './Firebase';
import { Link } from "react-router-dom";


function SidebarChat({ id,name,addNewChat}){

    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState('');

    useEffect(() =>{
        if(id) {
            db.collection("rooms").doc(id).collection('messages')
            .orderBy("timestamp", 'desc')
            .onSnapshot((snapshot) => (
                setMessages(snapshot.docs.map((doc) => doc.data()))
            ));
        }
    }, [id]);
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

   // console.log(name);
    return !addNewChat? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="sidebarChat_info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
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
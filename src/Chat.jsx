import React, { useEffect, useState } from 'react';
import './Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import db from './Firebase';

function Chat() {

    const [seed, setSeed] = useState("");
    const [input, setInput] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    
    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId)
                .onSnapshot(snapshot => (
                    setRoomName(snapshot.data().name)
                ));
        }

    }, [roomId]);

    useEffect(() => {
        var x = Math.floor(Math.random() * 5000);
        setSeed(x);
    }, [roomId]);

    function sendMessage(e){
        e.preventDefault();
        console.log(input);
        setInput("");
    }
    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p>
                        last seen
                        {/* {new Date(messages[messages.length -1]?.timestamp?.toDate()).toUTCString()} */}
                    </p>
                </div>
                <div className="chat_headerRight">
                    <IconButton><SearchIcon /></IconButton>
                    <IconButton><AttachFileIcon /></IconButton>
                    <IconButton><MoreVertIcon /></IconButton>
                </div>
            </div>
            <div className="chat_body">
                <div className={`chat_message ${true && "chat_receiver"}`}>
                        <span className="chat_name">message</span>
                        scsdcsdcsdcsdd
                        <span className="chat_timestamp">
                            3:00pm
                        </span>
                </div>
            </div>
            <div className="chat_footer">
                <IconButton><InsertEmoticonIcon /></IconButton>
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type a message" />
                    <button onClick={sendMessage} type="submit" >Send a message</button>
                </form>
                <IconButton><MicIcon /></IconButton>
            </div>
        </div>

        
         
       
    )
}

export default Chat;
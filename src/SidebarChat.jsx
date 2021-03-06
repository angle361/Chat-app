import "./SidebarChat.css";
import React, { useEffect, useState } from 'react';
import { Avatar} from "@material-ui/core";
import db from './Firebase';
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';

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
            db.collection('rooms').add({
                name: roomName,
            });
        }
    }
    const deleteRoom = () => {
        if(id){
            db.collection('rooms').doc(id).delete();
        }
    }

//    console.log(name);
    return !addNewChat? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="sidebarChat_info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                    {/* <p>{messages[0]?.message}</p> */}
                    <Button className = "btn-1" onClick={deleteRoom}><CancelRoundedIcon /></Button>
                </div>
            </div>
        </Link>
        
    ):(
        <div>
                {/* <h2>Add new Chat</h2> */}
            <Button className = "btn-2" onClick={createChat} style={{position:"absolute",bottom:"50px",right:"20px",color:"green"}}><AddCircleRoundedIcon /></Button>
        </div>
    );

  

}

export default SidebarChat;
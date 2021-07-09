import React, { useEffect, useState } from 'react';
import './Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { AddPhotoAlternate, MoreVert, DoneAllRounded, ArrowDownward, ArrowBack } from '@material-ui/icons';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import db from './Firebase';
import { useStateValue } from './StateProvider';
import firebase from "firebase";
import Picker from 'emoji-picker-react';
import { useMediaQuery } from 'react-responsive';
import Compressor from 'compressorjs';
import {storage } from './Firebase';
function Chat() {

    const [seed, setSeed] = useState("");
    const [input, setInput] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState(null);
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();
    const [emoji, setEmoji] = useState(false);
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [src, setSRC] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId)
                .onSnapshot(snapshot => (
                    setRoomName(snapshot.data().name)
                ));

            db.collection("rooms").doc(roomId).collection("messages")
                .orderBy("timestamp", 'asc').onSnapshot((snapshot) =>
                    setMessages(snapshot.docs.map((doc) => doc.data())));
        }

    }, [roomId]);

    useEffect(() => {
        var x = Math.floor(Math.random() * 5000);
        setSeed(x);
    }, [roomId]);

    function sendMessage(e) {
        e.preventDefault();
        //console.log(input);
        db.collection("rooms").doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        setInput("");
    }
    // send emoji
    function showEmoji() {
        if (emoji) {
            setEmoji(false);
        }
        else {
            setEmoji(true);
        }
    }
    function onEmojiClick(event, emojiObject) {
        setChosenEmoji(emojiObject); setInput(input + chosenEmoji.emoji);
    }

   ////////////////////////// //send pic//////////////////////////////
    const handleFile = event => {
        if (window.navigator.onLine) {
            if (event.target.files[0]) {
                var reader = new FileReader();
                reader.onload = function () {
                    setSRC(reader.result)
                }
                reader.readAsDataURL(event.target.files[0]);
                setImage(event.target.files[0])
            };
        } else {
            alert("No access to internet !!!");
        };
    };
    if (image) {
        var split, imageName;
        if (image) {
            split = image.name.split(".");
            imageName = split[0] + Math.floor(Math.random()*1000) + "." + split[1];
        }
        new Compressor(image, { quality: 0.8, maxWidth: 1920, async success(result) {
            setSRC("");
            setImage(null);
            await storage.child(imageName).put(result);
            const url = await storage.child(imageName).getDownloadURL();
            db.collection("rooms").doc(roomId).collection("messages").add(
            {
                imageUrl: url,
                name: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
        }});
    };
    //////////////////////////////////////////////////////////////////////////////
    const isMobile = useMediaQuery({
        query: '(max-device-width: 768px)'
    });
    return roomName ? (
        <div className="chat">
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p>
                        last on{" "}
                        {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}
                    </p>
                </div>
                <div className="chat_headerRight">
                    <IconButton><SearchIcon /></IconButton>
                    {/* <IconButton><AttachFileIcon /></IconButton> */}
                    <input id="attach-media" style={{ display: "none" }} accept="image/*" type="file" onChange={handleFile} />
                    <IconButton>
                        <label style={{ cursor: "pointer", height: 24 }} htmlFor="attach-media">
                            <AddPhotoAlternate />
                        </label>
                    </IconButton>
                    <IconButton><MoreVertIcon /></IconButton>
                </div>
            </div>
            <div className="chat_body">
                {messages.map((message) => (
                    <p className={`chat_message ${message.name === user.displayName && 'chat_receiver'} `}>
                        <span className="chat_name">{message.name}</span>
                        <div className="chat_message_info">
                            {!message.imageUrl? message.message
                              :
                              <div style={{height:"50px"}}>
                                  <img src={message.imageUrl} alt="img" style={{height:"50px"}}/>
                              </div>
                            }
                           
                        </div>

                        <span className="chat_timestamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}
            </div>
            <div className="chat_footer">
                {emoji && <Picker onEmojiClick={onEmojiClick} />}
                <IconButton><InsertEmoticonIcon onClick={showEmoji} /></IconButton>
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type a message" />
                    <button onClick={sendMessage} type="submit" >Send a message</button>
                </form>
                <IconButton><MicIcon /></IconButton>
            </div>
        </div>

    )
        :
        (
            <div className="chat">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/598px-WhatsApp.svg.png" alt="" />
            </div>
        )
}

export default Chat;
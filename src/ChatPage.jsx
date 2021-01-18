import React, { useEffect, useState } from 'react';
import OrderChat from './OrderChat';
import useLocalStorage from './useLocalStorage';
import socketIOClient from "socket.io-client";

const socket = socketIOClient("chatkot12.herokuapp.com:3002", {
    transports: ["websocket"],
secure: true,
});

const ChatPage = () => {
    const [users, setUsers] = useLocalStorage("chat-users", []);
    const [message, setMessage] = useState([])

    const [name, setName] = useLocalStorage("me","");
    const [click, setClick] = useState(false);
    
    const handleChange = ({currentTarget}) => {
        const {value }= currentTarget;
            setName(value);
    }
    const login = () => {
        setClick(true)
        socket.emit('login', name);
    }
    
    const del = () => {
        socket.emit('del', 1);
    }
    const send = function (e, { desc }) {
        e.preventDefault();
        socket.emit("send", { from: name, desc: desc, to:"others"});
    };
    socket.on("time",e => console.log(e))
    useEffect(() => {
        socket.on("users", (e) => {setUsers(e); console.log(e)})    
        socket.on("oldmsg",e => setMessage(e))
        socket.on("send", e => 
        setMessage((prev) => [...prev, e])        
        )
        console.log(socket.io)
        
        socket.on("del",e => setMessage([]))
    }, [])
console.log(process.env)

    return (
        <>
        {!click ? <>
        <input type="text" name="name" placeholder="Votre nom ..." value={name} onChange={handleChange} />
        <button onClick={() => login()} disabled={!name}>Valider</button></>
        :
            <div className="row">
                <div className="">
                    <div className="card mb-3 body-chat">
                        <h3 className="card-header text-dark">Utilisateurs</h3>
                        <div className="card-body">
                            {users.map((e, index) => <li key={index} className="list-group-item text-dark" >{e}</li>)}
                        </div>
                    </div>
                </div>
                <div className="col ">
                    <OrderChat send={send} message={message} me={name} setMessage={setMessage} del={del} />
                </div>
            </div>
        }
        </>
    );
}

export default ChatPage;
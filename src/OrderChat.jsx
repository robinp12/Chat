import React, { useRef } from 'react';

const OrderChat = ({ message, setMessage, send, selectedUser,me,del }) => {

    const inputRef = useRef();

    const isMe = function (e) {
        if (e.from==me) return true
    }
    
    const Message = () => {
        return (<>
            <div>
                {message.map((e, index) =>
                    <div key={index} className={"row mx-2 " + (isMe(e) ? "justify-content-end" : " ")}>
                        <div className="">
                            <div className={"alert " + (isMe(e) ? "alert-info" : "alert-warning")}>
                                <div className="alert-heading">{e.from}</div>
                                <span>{e.desc}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>)
    }

    return (
        <>
            <div className="card ">
                <h3 className="card-header text-dark">
                    <span>Message {selectedUser}
                    {me=="Robin"&& 
                    <>
                        <button className="float-right btn btn-sm btn-primary"
                        onClick={(e) => { e.preventDefault(); del() }}
                        >
                            <i className="fa fa-trash " aria-hidden="true"></i>

                        </button>
                            </>
                        }
                    </span>
                </h3>
                <form onSubmit={(e) => { send(e, { desc: inputRef.current.value }); e.currentTarget.reset() }}>

                    <Message />
                    <div className="card-footer text-muted ">
                        <div className="row align-middle align-items-center">
                            <div className="col">
                                <input className="form-control" ref={inputRef} placeholder="Ecris ton message"></input>
                            </div>
                            <div className="">
                                <button className="btn btn-primary" type="submit"><i className="fa fa-paper-plane " aria-hidden="true"></i></button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default OrderChat;
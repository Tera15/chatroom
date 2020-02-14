import React from 'react';
import io from 'socket.io-client';

//initialize React Context 
export const CTX = React.createContext();

/**
 *{
     from: 'user',
     msg: 'hi',
     topic: 'general
 } 
 *


 state {
     General [
         {msg}, {msg}, {msg}
     ]

     topic2: [
         {msg}, {msg}, {msg}
     ]
 }
 */
const initState = {
    General: [
        // {from: 'Aaron', msg: 'Hey buddy'},
        // {from: 'Bill', msg: 'Hey buddy'},
        // {from: 'Ronald', msg: 'Hey buddy'}
    ],

    RoomTwo: [
        // {from: 'Arnold', msg: 'Hey buddy'},
        // {from: 'Ben', msg: 'Hey buddy'},
        // {from: 'Roy', msg: 'Hey buddy'}
    ]
}


function reducer(state, action) {
    const {from, msg, topic} = action.payload;
   switch(action.type) {
       case 'RECIEVE_MESSAGE':
           return{
               ...state,
               [topic]: [
                   ...state[topic],
                   {from, msg}
               ]
           }
        default: 
            return state   
   }
}

//initialized socket outside of Store 
// so that socket doesnt rerender every store reload
let socket;



function sendChatAction(value){
    socket.emit('chat message', value);
}

export default function Store(props) {
    const [allChats, dispatch] = React.useReducer(reducer, initState);
    // const port = process.env.PORT;
    if (!socket) {
        socket = io(`https://ez-talk-api.herokuapp.com/`);
        socket.on("chat message", function(msg) {
            console.log(msg)
          dispatch({ type: 'RECIEVE_MESSAGE', payload: msg });
        });
      }
    
      const user = 'anonymous' + Math.random(100).toFixed(2);
    
     return (
        <CTX.Provider value={{allChats, sendChatAction, user}}>
            {props.children}
        </CTX.Provider>
    );
}

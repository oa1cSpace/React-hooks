import React, { useState, useEffect } from "react";

// https://jsonplaceholder.typicode.com/

function Effect() {
    const [type, setType] = useState('users');
    const [data, setData] = useState([]);
    const [cursorPosition, setCursorPosition] = useState({
        x: 0,
        y: 0,
    })

    // useEffect(() => {
    //     console.log('useEffect 1');
    // });

    // useEffect служит для определенных сайд эффектов, например отслеживанине type и загрузке данных только при его изменении
    useEffect(() => {
        console.log(`Type has changed to: ${type}`);
        fetch(`https://jsonplaceholder.typicode.com/${type}`)
            .then(response => response.json())
            .then(json => setData(json));
        return () => {
            console.log('clean type');
        }
    },[type]);

    const mouseMoveHandler = event => {
        return setCursorPosition({
            x: event.clientX,
            y: event.clientY,
        });
    }

    // эмуляция life-cicle hooks
    useEffect(() => {
        console.log('ComponentDidMount');
        window.addEventListener('mousemove', mouseMoveHandler);
        // отписка
        // return (
        //     window.removeEventListener('mousemove', mouseMoveHandler)
        // );
    },[]);

    return(
        <>
            <h1>useEffect</h1>
            <h3>Resource: {type}</h3>
            <button onClick={() => setType('users')} className="btn">Users</button>
            <button onClick={() => setType('todos')} className="btn">ToDos</button>
            <button onClick={() => setType('posts')} className="btn">Posts</button>
            <h4>Cursor position</h4>
            <pre>{JSON.stringify(cursorPosition,null,2)}</pre>
            <h4>Resource: {type}</h4>
            <pre>{JSON.stringify(data,null,2)}</pre>
        </>
);
}

export default Effect;

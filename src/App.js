import React, { useState } from 'react';
import Notification from "./components/Notification/Notification";

const App = () => {

    const [state, setState] = useState({notification: {msg: 'Initial notification'}})

    const addNotificationHandler = () => {
        const messages = [
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
            'Post successfully added',
            'Some random text'
        ]

        const selectedMessage = messages[Math.floor(Math.random() * (messages.length - 1))];
        setState((prevState) => {
            return {
                ...prevState,
                notification: {
                    msg: selectedMessage
                }
            }
        })
    }

    return (
        <div>
            <Notification title='Notification' msg={state.notification.msg} type='default' timeout={Math.floor(Math.random() * 10000) + 3000}/>
            <button onClick={addNotificationHandler}>Add another notification</button>
        </div>
    );
}

export default App;

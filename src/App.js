import React, { useState } from 'react';
import Notification from "./components/Notification/Notification";

const App = () => {

    const [state, setState] = useState({notification: {msg: 'Initial notification'}})

    const addNotificationHandler = () => {
        setState((prevState) => {
            return {
                ...prevState,
                notification: {
                    msg: 'Notification: ' + Math.floor(Math.random() * 20)
                }
            }
        })
    }

    return (
        <div>
            <Notification title='Notification' msg={state.notification.msg} type='default' timeout={1000000}/>
            <button onClick={addNotificationHandler}>Add another notification</button>
        </div>
    );
}

export default App;

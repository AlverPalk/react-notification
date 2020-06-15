import React, { useEffect, useState } from 'react';
import classes from './Notification.module.css'

const Notification = (props) => {
    const [state, setState] = useState(() => {
        return {
            notifications: []
        }
    })

    /**
     * @function useEffect
     * Creates a new notification object, with fields based on the props passed to the notification component.
     * Id for the notification is automatically generated. Timeout handler (based on props.timeout) is also added to the
     * object for possible reference by @function removeNotificationHandler. Function executes every time props.msg or
     * props.timeout is changed.
     * @returns new state object
     */
    useEffect(() => {
        // Add notification to state
        const id = generateRandomId();
        setState((prevState) => {
            const newNotifications = [...prevState.notifications];
            newNotifications.push({
                id: id,
                title: props.title,
                msg: props.msg,
                timeout: props.timeout,
                animate: true,
                // Set automatic notification deletion based on passed timeout
                timeoutHandler: setTimeout(() => {
                    setState(prevState => {
                        const newNotifications = removeNotificationFromState(prevState, id)
                        return {
                            ...prevState,
                            notifications: newNotifications
                        }
                    })
                }, props.timeout)
            })
            return {
                ...prevState,
                notifications: newNotifications
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.msg, props.timeout])

    const removeNotificationFromState = (prevState, id) => {
        const newNotifications = [...prevState.notifications];
        const notificationToRemove = prevState.notifications.filter(notification => notification.id === id)[0];
        clearTimeout(notificationToRemove.timeoutHandler);
        const index = prevState.notifications.indexOf(notificationToRemove);
        if (index === -1) return {...prevState};
        newNotifications.splice(index, 1);
        return newNotifications;
    }

    /**
     * @function generateRandomId
     * Generates random number between 0 and 1000000. Afterwards checks if the id is not in use by any other notification.
     * If id is a duplicate, new id will be generated. Process is repeated until a unique id is generated.
     * @returns {number} id - Returns randomly generated id
     */
    const generateRandomId = () => {
        let id;
        for (let i = 0; i < 1; i++) {
            id = Math.floor(Math.random() * 1000000);
            for (let j = 0; j < state.notifications.length; j++) {
                if (state.notifications[i].id === id) {
                    i = -1;
                }
            }
        }
        return id;
    }

    /**
     * @function removeNotificationHandler
     * Creates a new notifications array based on the previous state and removes the notification which id is equal
     * to the @param id. After that clears the setTimeout() that will not have a chance to execute and assigns the new
     * notifications array to the state.
     * @param {number} id - Id of the notification that should be deleted
     * @returns [New state object] - If removal was successful.
     *          [Previous state as new state object] - If id passed does not match any notification id.
     *          [-1] - If id passed was not a number.
     */

    const removeNotificationHandler = (id) => {
        if (typeof id === "number") {
            setState(prevState => {
                const newNotifications = removeNotificationFromState(prevState, id);
                return {
                    ...prevState,
                    notifications: newNotifications
                }
            })
        }
        return -1;
    }

    const removeTimeoutHandler = (id) => {
        setState(prevState => {
            // Clear timeout and remove timeout handler
            const newNotifications = [...prevState.notifications];
            const notification = prevState.notifications.filter(notification => notification.id === id)[0];
            let timeOutHandler = newNotifications[newNotifications.indexOf(notification)].timeoutHandler;
            clearTimeout(timeOutHandler);
            timeOutHandler = null;

            // Pause animation
            notification.animate = false;

            return {
                ...prevState,
                notifications: newNotifications,
            }
        })
    }

    const classArray = [classes.Notification, classes[props.type.charAt(0).toUpperCase() + props.type.slice(1)]];

    const notifications = state.notifications.map((notification, index) => {
        return <div
            onClick={removeNotificationHandler.bind(this, notification.id)}
            onMouseEnter={removeTimeoutHandler.bind(this, notification.id)}
            key={notification.id}
            className={classArray.join(' ')}
        >
            <header>{notification.title}</header>
            <span>{notification.msg}</span>
            <div
                className={classes.Timeout}
                style={{
                    animationDuration: `${notification.timeout}ms`,
                    animationPlayState: notification.animate ? 'running' : 'paused',
                    backgroundColor: notification.animate ? '#68e764' : '#e76464'
                }} />

        </div>
    })

    return (
        <React.Fragment>
            <div className={classes.NotificationContainer}>
                {notifications}
            </div>
        </React.Fragment>
    );
};

export default Notification;
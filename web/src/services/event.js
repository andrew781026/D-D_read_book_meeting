/*

Event {
    title
    time
    place
    describe
}
 */

import {setItem, getItem} from "../utils/localStorage";
import uuid from "uuid";

const EVENT_KEY = 'events';

const EventService = {

    insertEvent: ({title, time, place, describe}) => {

        const uuid = uuid.v4();

        const events = JSON.parse(getItem(EVENT_KEY));
        const newEvents = events.push({uuid, title, time, place, describe});
        setItem(JSON.stringify(newEvents));

        return newEvents;
    },

    deleteEvent: (uuid) => {

        const events = JSON.parse(getItem(EVENT_KEY));
        const newEvents = events.filter(evt => evt.uuid !== uuid);
        setItem(JSON.stringify(newEvents));

        return newEvents;
    },

    updateEvent: ({uuid, title, time, place, describe}) => {

        const updateEvt = {uuid, title, time, place, describe};
        const events = JSON.parse(getItem(EVENT_KEY));
        const newEvents = events.map(evt => (evt.uuid === uuid) ? updateEvt : evt);
        setItem(JSON.stringify(newEvents));

        return newEvents;
    },
};

export default EventService;
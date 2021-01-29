/*

Event {
    title
    time
    place
    describe
}
 */

import {setItem, getItem} from "../utils/localStorage";
import {v4 as uuidv4} from 'uuid';

const EVENT_KEY = 'events';

const EventService = {

    init: () => {

        const events = getItem(EVENT_KEY);
        if (!events) setItem(EVENT_KEY, '[]');
    },

    listEvent: () => JSON.parse(getItem(EVENT_KEY)),

    insertEvent: ({title, time, place, describe}) => {

        const uuid = uuidv4();

        const events = JSON.parse(getItem(EVENT_KEY));
        events.push({uuid, title, time, place, describe});
        setItem(EVENT_KEY, JSON.stringify(events));

        return events;
    },

    deleteEvent: (uuid) => {

        const events = JSON.parse(getItem(EVENT_KEY));
        const newEvents = events.filter(evt => evt.uuid !== uuid);
        setItem(EVENT_KEY, JSON.stringify(newEvents));

        return newEvents;
    },

    updateEvent: ({uuid, title, time, place, describe}) => {

        const updateEvt = {uuid, title, time, place, describe};
        const events = JSON.parse(getItem(EVENT_KEY));
        const newEvents = events.map(evt => (evt.uuid === uuid) ? updateEvt : evt);
        setItem(EVENT_KEY, JSON.stringify(newEvents));

        return newEvents;
    },
};

export default EventService;
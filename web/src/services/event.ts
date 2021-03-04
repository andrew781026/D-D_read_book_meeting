import {setItem, getItem} from "../utils/localStorage";
import {v4 as uuidv4} from 'uuid';

const EVENT_KEY = 'events';

// 讀書會
interface event {

    // 編號
    uuid?: string,
    // 標題
    title?: string,
    // 時間
    time?: string,
    // 地點
    place?: string,
    // 描述
    describe?: string,
    // 內容
    content?: string,
    // 成員
    members?: object[],
    // 圖片
    img_url?: string
}

interface service {
    init: () => void;

    listEvent: () => event[];
    insertEvent: (arg: event) => event[];
    deleteEvent: (uuid: string) => event[];
    updateEvent: (arg: event) => event[];
}

const EventService: service = {

    init: () => {

        const events = getItem(EVENT_KEY);
        if (!events) setItem(EVENT_KEY, '[]');
    },

    listEvent: () => JSON.parse(getItem(EVENT_KEY) || ''),

    insertEvent: (insertEvt) => {

        const uuid = uuidv4();

        const events = JSON.parse(getItem(EVENT_KEY) || '');
        events.push({...insertEvt, uuid});
        setItem(EVENT_KEY, JSON.stringify(events));

        return events;
    },

    deleteEvent: (uuid) => {

        const events = JSON.parse(getItem(EVENT_KEY) || '');
        const newEvents = events.filter((evt: event) => evt.uuid !== uuid);
        setItem(EVENT_KEY, JSON.stringify(newEvents));

        return newEvents;
    },

    updateEvent: (updateEvt) => {

        const events = JSON.parse(getItem(EVENT_KEY) || '');
        const newEvents = events.map((evt: event) => (evt.uuid === updateEvt.uuid) ? updateEvt : evt);
        setItem(EVENT_KEY, JSON.stringify(newEvents));

        return newEvents;
    },
};

export default EventService;

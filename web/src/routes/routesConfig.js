import React from 'react';

const lazyTime = (path, duration = 300) => React.lazy(() => {
    return new Promise(resolve => {
        setTimeout(() => resolve(path), duration);
    });
});

const routes = [
    {
        path: "/D-D_read_book_meeting/loading",
        component: React.lazy(() => import('../views/loading/Loading'))
    },
    {
        path: "*",
        component: lazyTime(import('../views/home/Home'), 1000)
    },
]

export default routes;

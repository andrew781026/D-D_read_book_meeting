import React from 'react';

const lazyImport = (path, duration = 300) => React.lazy(() => {
    return new Promise(resolve => {
        setTimeout(() => resolve(path), duration);
    });
});

const routes = [
    {
        path: "/list",
        component: React.lazy(() => import('../views/list/List'))
    },
    {
        path: "/create",
        component: React.lazy(() => import('../views/create/Create'))
    },
    {
        path: "/loading",
        component: React.lazy(() => import('../views/loading/Loading'))
    },
    {
        path: "*",
        component: lazyImport(import('../views/home/Home'), 1000) // 控制最小載入時間
    },
]

export default routes;

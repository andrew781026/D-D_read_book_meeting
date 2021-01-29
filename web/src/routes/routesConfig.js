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
        path: "/loading",
        component: React.lazy(() => import('../views/loading/Loading'))
    },
    {
        path: "*",
        component: lazyImport(import('../views/home/Home'), 1000)
    },
]

export default routes;

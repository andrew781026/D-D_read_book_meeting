# read book meeting web

網頁部分 , 使用 React.JS 進行開發

為求簡單 , 我們使用 create-react-app 建構基礎框架並且不 eject

### 技術清單 :

- [react](https://zh-hant.reactjs.org/) - 前端三大框架之一
- [react-live](https://www.npmjs.com/package/react-live) - 方便 React 客製元件 Demo 的工具  
- [material-UI](https://material-ui.com/zh/getting-started/installation/) - 符合 google 設計規範的 UI 框架 
- [formik](https://formik.org/docs/overview) - facebook 推薦的表單管理框架
- [json-server](https://www.npmjs.com/package/json-server) - 利用 db.json 做出的 mock REST server

### 可能使用的技術

- [react-markdown-editor-lite](https://github.com/HarryChen0506/react-markdown-editor-lite) - react 的 markdown 編輯器套件
- [react-big-calendar](https://github.com/jquense/react-big-calendar) - react 的日曆套件

### 前置安裝

下方為需要先安裝的一些程式

- [node.JS](https://nodejs.org/en/download/) - 前端開發必定安裝的 EXE 
- [vscode](https://code.visualstudio.com/) - 免費好用的 FrontEnd IDE

> 如何開發 ?

使用 `npm run start` 你將會在 http://localhost:3000 上開啟 webpack-dev-server

```shell script
npm run start 
```

使用 `npm run api:run` 讓你利用 /json-server/db.json 資料在 http://localhost:3003 上啟動一個 API server

```shell script
npm run api:run 
```

[![json-server](https://i.imgur.com/P7d0Olk.png)](http://localhost:3003)

> 測試

之後可能會加入 Jest 當作測試工具

```shell script
npm run test 
```

> 編譯與部屬

```shell script
npm run build 
```


使用 material-ui 當做 UI 框架

https://material-ui.com/zh/getting-started/installation/

如果需要存 CSS 框架可用 [materialize](https://materializecss.com/)

### 解決 gh-pages 沒有 url-rewrites 的方法

#### 以下方法參考 [spa-github-pages](https://github.com/rafgraph/spa-github-pages)

- 1. 利用 github 可以客製化 404.html 頁面
    - add 404.html [same as this](https://github.com/rafgraph/spa-github-pages/blob/gh-pages/404.html#L25)
- 2. 修改 index.html 接收 404.html 轉過來的參數

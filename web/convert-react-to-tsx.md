# 如何將 現有的 React 專案加上 TypeScript 功能 ? 

當我們手頭有一個執行 1 年多的 react 專案 , 我們想要在這個上面加上 TypeScript 的功能 , 

那我們

#### 安裝 TypeScript

安裝 TypeScript 套件 & react . react-dom 的 ts 定義文件 - @types/react . @types/react-dom

```shell
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

#### 新增 tsconfig.json

tsconfig.json 是 TypeScript 的設定檔 , 它會定義 ts 檔案需要符合甚麼規則 ( 例 : 限制 console.log 不能在專案中 `no-console : true` )

```shell
npx tsc --init
```


### 參考資料

- [How to Migrate a React App to TypeScript](https://www.sitepoint.com/how-to-migrate-a-react-app-to-typescript/)
- [tslint not allow console log](https://stackoverflow.com/questions/49990513/tslint-says-calls-to-console-log-are-not-allowed-how-do-i-allow-this)

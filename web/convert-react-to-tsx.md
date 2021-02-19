# 如何將 現有的 React 專案加上 TypeScript 功能 ? 

當我們手頭有一個執行 1 年多的 react 專案 , 我們想要在這個上面加上 TypeScript 的功能 , 

那我們可以執行下方步驟 , 將其轉換成有 TypeScript 功能的 react 專案

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

指令 `npx tsc --init` 會產生一個 `tsconfig.json` 檔案到根目錄中 

![](https://i.imgur.com/OlwhtoO.png)

#### 修改 tsconfig.json 設定

如果這時我們執行 `npm run start` 的話 , 我們會遇到

```shell
error TS18003: No inputs were found in config file 'tsconfig.json'. Specified 'include' paths were '["src/**/*"]' and 'exclude' paths were '["node_modules"]'.
```

這代表我們的專案中缺少了 .ts 檔案 , 因此我們需要將 index.js 的副檔名改成 .tsx

| 錯誤碼        | 說明                                                        |      
| ------------- | ----------------------------------------------------------- | 
| error TS18003 | TypeScript 在資料夾 src 中沒有偵測到任何的 .ts 或 .tsx 檔案 |     

之後 , 我們就可以順利執行 `npm run start` 了 😀

### 參考資料

- [How to Migrate a React App to TypeScript](https://www.sitepoint.com/how-to-migrate-a-react-app-to-typescript/)
- [tslint not allow console log](https://stackoverflow.com/questions/49990513/tslint-says-calls-to-console-log-are-not-allowed-how-do-i-allow-this)

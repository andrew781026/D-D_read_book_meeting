# Create React App

### 修改 Dev-Server 使用的 Port

官方文件 : https://create-react-app.dev/docs/advanced-configuration/

如果你要使用不同的 port 啟動 `開發伺服器`

```shell
set PORT=3006 && react-scripts start
```

設定參數的方式 : [How to specify a port to run a create-react-app based project?](https://stackoverflow.com/questions/40714583/how-to-specify-a-port-to-run-a-create-react-app-based-project)

### 修改專案使用的根路徑 ( baseUrl )

官方文件 : https://create-react-app.dev/docs/advanced-configuration/

| 參數 | 開發模式 | 產品模式 | 說明 |
| -------- | -------- | -------- | -------- |
| PUBLIC_URL | ✅ Used  | ✅ Used     | Create React App 會參考 package.json 的 homepage 來決定 <span style="background-color: #66f338;">專案根路徑</span> .<br /><br /> 或是你也可以設定 PUBLIC_URL 參數來指定 <span style="background-color: #66f338;">專案根路徑</span> .     |

你可以修改 package.json 中的 homepage 參數

```
{
  "name": "readbook-meeting-web",
  "homepage": "https://host_name.com/D-D_read_book_meeting/", <- 設定 "專案根路徑"
  ...
}
```

或是指定 PUBLIC_URL 參數

```shell
set PORT=3006 && set PUBLIC_URL=http://localhost:3006/D-D_read_book_meeting/&& react-scripts start
```

### 利用 .env 檔案設定參數

官方文件 : https://create-react-app.dev/docs/adding-custom-environment-variables/#adding-development-environment-variables-in-env

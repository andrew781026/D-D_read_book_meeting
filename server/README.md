# Book Club For express

## Project features

## 開發時所使用的技術

* NodeJS - 15.6
* ExpressJS - 4.16
* Mariadb - 10.5.8
* Docker Engine - 20.10 (選擇)
    * Mariadb - 10.5.8
    * NodeJS - 15.6
    * Adminer - 4.7.8

## 如何建立開發環境


### Use Firebase Function & Realtime Database to create a terminal enviroment (Early Stage)

To setup a enviroment for providing frontend to demo and fetch data,  
we choose Firebase to create a temporate server to deal with these request.  
In the same time, we'll try to build **Mariadb** for formally use.  
As the creation of the Mariadb database is complete,we'll migrate the data on Firebase to Mariadb.   
  
Shown below is the Google account for the Firebase:
* Email : bookclub.dd.side.project@gmail.com
* Password : 5hp5hpTzUYSQ

For now : 
1. we use express.js to create an server as a Cloud Function on Firebase.  
Tutorial : https://www.youtube.com/watch?v=Qnw2bO3ljZs  
2. Use Firebase Realtime Database as the database   
documents : https://firebase.google.com/docs/database  

上傳至Cloud Function  

1. 登入帳號(bookclub.dd.side.project@gmail.com)
```
firebase login
```

2. 部屬檔案
```
firebase deploy
```
目前可以用的API  
* 存取Firebase資料庫 : https://us-central1-fir-project-85d2e.cloudfunctions.net/app/data_get
* 新增資料：https://us-central1-fir-project-85d2e.cloudfunctions.net/app/process_update?first_name=A&last_name=B

### Use Docker Develop

```
docker-compose up
```

在另一個 terminal run
```
docker exec -it <ID> bash
```

### Localhost Develop

先安裝 nodejs

## 部屬

## Screenshots
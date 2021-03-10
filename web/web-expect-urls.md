
以下審略 host

```typescript
interface user {
  userId , // D_D 系統的 userID
  fb_uid , 
  google_uid , 
  apple_uid , 
  interest : string[] , // 興趣主題
  nickname : string , // 暱稱
  job : string , // 職業
  description : text , // 自我介紹
}
```

GET /cities - 取得縣市列表   
    res - { id , name }

GET /frequency - 取得頻率列表  
    res - { id , name }
    
GET /topic - 取得書籍類型  
    res - { id , name }

POST /register - 使用者註冊   
    req - { email , password } 或是 FB / google / apple 的兩階段驗證
    res - { user , jwtToken }

POST /login - 使用者登入   
    req - { email , password } 或是 FB / google / apple 的兩階段驗證
    res - { user , jwtToken }
    
POST /logout - 使用者登出   
    req - { userId }
    res - 200
    
POST /forgotPassword - 忘記密碼 , 重寄驗證信件    
    req - { email } 
    res - 200 , 寄信到指定信箱 , 會有更改密碼的網址連結 & UUID 

POST /changePassword - 打開信件後 , 利用那個連結更改密碼      
    req - { email , newPassword , oldPassword , uuid } - 有 uuid 可以不用有 oldPassword    
    res - { user , jwtToken }  
    
GET /labels - 書籍標籤       
    res - { labels : string[] }   
    
GET /events - 讀書會列表      
    query - { search , topic , frequency , time , city }
    res - { events : event[] }   
    
POST /events - 建立新的讀書會  
    req - { event }
    res - { event }    
    
PATCH /events/{event_id}/join - 申請加入讀書會  
    req - { userID }
    res - { event }    
    
PATCH /events/{event_id} - 修改讀書會內容  
    req - { event }
    res - { event }    
    
PATCH /events/{event_id}/hold - 成立讀書會 (開始實際 run)  
    req - {  }
    res - { event }    
    
